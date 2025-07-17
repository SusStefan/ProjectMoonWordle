import { useState, useEffect} from 'react'
import { Button } from "../UI/Button"

// Limbus page
const Limbus = () => {

type Guess = {
  id?:number;
  name: string;
  start?:number;
  tag?: string;  // or whatever properties you have
  gender?: string;
  imgsrc?: string;
  imp?:number;
};

const [solution, setSolution] = useState<Guess | null>(null);
const [guess, setGuess] = useState<Guess>({ name: "" });
const [guesses, setGuesses] = useState<Guess[]>([]);
const [characters, setCharacters] = useState<Guess[]>([]);
let [nrguesses, setnrguesses] = useState(5);
const [suggestions, setSuggestions] = useState<Guess[]>([]);
const [highscore, sethighscore] = useState(0);
useEffect(() => {
  fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((json) => {
     const data = Array.isArray(json) ? json : json.characters;
      setCharacters(data);
      const randomSolution = data[Math.floor(Math.random() * data.length)];
      console.log(characters);
      setSolution(randomSolution);
    });

}, []);
const restartGame = () => {
  // Pick a new random solution
  const newSolution = characters[Math.floor(Math.random() * characters.length)];
  setSolution(newSolution);
  // Reset everything else
  setGuesses([]);
  setGuess({ name: "" }); // or "" if guess is just a string
  setnrguesses(5);       // if you're tracking attempts
};

const saveHighscore = async (name: string, score: number) => {
  await fetch("http://localhost:3000/highscores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      score: highscore,
      timestamp: new Date().toISOString(),
    }),
  });
};

const handleGuessSubmit = () => {
  setnrguesses(nrguesses-1);

  if (guess.name.trim() === "") return;
  const normalizedGuess = guess.name.trim().toLowerCase();
   
  // Find the character object that matches the guess
  const matchedCharacter = characters.find(
    char => char.name.toLowerCase() === normalizedGuess
  );

  if (matchedCharacter) {
    setGuesses(prev => [ matchedCharacter,...prev]);  // matchedCharacter is a Guess object
  } else {
    // Create a minimal Guess object for not found guesses
    const notFoundGuess: Guess = { name: guess.name };
    setGuesses(prev => [notFoundGuess,...prev]);
  }
  if(solution?.name === matchedCharacter?.name)
  {
    alert("you won!") 
    sethighscore(highscore+1);
    restartGame()
  } 
    if(nrguesses<1)
  {
  alert("you lost!");
  saveHighscore("Player",highscore)
  window.location.reload()
  }
  setGuess({name:""}); // clear input
    
};


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  setGuess({ name: input });
  if (input.trim() === "") {
    setSuggestions([]);
    return;
  }

  const filtered = characters.filter(char =>
    char.name.toLowerCase().startsWith(input.toLowerCase())
  );
  setSuggestions(filtered);
};

const selectSuggestion = (char: Guess) => {
  setGuess({ name: char.name });
  setSuggestions([]);
};
  return (
    <>
    
 <div className="flex absolute top-4 left-4">
 <Button onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Back</h1>
  </Button>
  <Button onClick={restartGame} >
  <h1 className="text-2xl font-bold mb-4 text-center">Restart Game</h1>
</Button>
  <div className="flex flex-col items-center">
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Guesses Remaining: {nrguesses}</h1>
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Score: {highscore}</h1>
   </div>
  </div>
      <div className="flex flex-col min-h-screen bg-[#000000] pt-30">
        <div className='bg-[#d6b942] rounded-lg shadow-lg min-h-full min-w-full p-6'>
          <div>
            <div className='bg-[#707070] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
            <div style={{ position: 'relative', width: '100%' }}>
  <input
    type="text"
    value={guess.name}
    onChange={handleInputChange}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleGuessSubmit();
    }}
    className="w-full bg-transparent outline-none text-right p-2"
    autoComplete="off"
  />

  {suggestions.length > 0 && (

   <ul
      className="flex 
      flex-col
      items-center
      absolute
      top-full
      pt-5
      w-1/3
      max-h-50
      overflow-y-scroll
      bg-black
      border-2 border-yellow
      z-100
    "
    >
      {suggestions.map((char, i) => (
        <div className='flex flex-wrap flex-row hover:bg-gray-700'>
        <li
          key={i}
          onClick={() => selectSuggestion(char)}
          className='flex pb-10 min-w-100'
          onMouseDown={e => e.preventDefault()} // Prevent input blur on click
        >
           <span className='flex'><img src={char?.imgsrc} alt={char?.name} className="w-25 h-20" /></span>
          <span className='flex flex-wrap'>{char.name}</span>
        </li>
        </div>
      ))}
    </ul>
 
  )}
</div>
            </div>
            <div className='bg-[#707070] text-white rounded-lg p-4 h-[340px] overflow-y-auto text-xl pr-2'>
  {guesses.length === 0 ? (
    <p className="text-gray-300">No guesses yet.</p>
  ) : (
 <ul className='p-10'>
  {guesses.map((g, i) => {
    const guessNumber = guesses.length - i;

    return (
      <li key={i} className="flex space-x-4 items-center rounded px-3 py-2  border-2 border-black">
        <span className="font-bold">#{guessNumber}</span>

        <span><img src={g?.imgsrc} alt={g?.name} className="w-25 h-20" /></span>

        <span className={g.name === solution?.name ? "text-green-500" : "text-red-500"}>
          <strong>Name:</strong> {g.name}
        </span>

        {g.gender && (
          <span className={g.gender === solution?.gender ? "text-green-500" : "text-red-500"}>
            <em>Tag: {g.gender}</em>
          </span>
        )}

        {g.tag && (
          <span className={g.tag === solution?.tag ? "text-green-500" : "text-red-500"}>
            <em>Tag: {g.tag}</em>
          </span>
        )}

        {g.start !== undefined && (
          <span className={g.start === solution?.start ? "text-green-500" : "text-red-500"}>
            <em>First Appearance: Canto {g.start}
            {solution?.start !== undefined && (
             g.start < solution.start ? " ↑↑↑" :
             g.start > solution.start ? " ↓↓↓" : ""
            )}
            </em>
          </span>
        )}
         
         {g.imp !== undefined && (
          <span className={g.imp === solution?.imp ? "text-green-500" : "text-red-500"}>
            <em>Start: {solution?.imp !== undefined && (
             g.imp === 0 ? "Fodder" :
             g.imp === 1 ? "NPC" :
             g.imp === 2 ? "MiniBoss" : 
             g.imp === 3 ? "MainBoss" : "Main"
            )}
            {solution?.imp !== undefined && (
             g.imp < solution.imp ? " ↑↑↑" :
             g.imp > solution.imp ? " ↓↓↓" : ""
            )}
            </em>
          </span>
        )}
      </li>
    );
  })}
</ul>

  )}
</div>
             
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">The Rule for importance is:</h1>
          <h1 className="text-2xl font-bold mb-4 items-center text-yellow-500 pl-4">Fodder &lt; NPC &lt; Miniboss &lt; Mainboss &lt; Main</h1>
          </div>
        </div>
      
    </>
  )
}

export default Limbus