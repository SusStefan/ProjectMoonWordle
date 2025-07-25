import { useState, useEffect} from 'react'
import { LimButton } from "../UI/limButton"

// Limbus page
const Limbus = () => {

type Guess = {
  id?:number;
  name: string;
  gender?:string;
  imgsrc?: string;
  tag?:string | string[];
  imp?: number  ;
  start?: string;
};


const [solution, setSolution] = useState<Guess | null>(null);
const [guess, setGuess] = useState<Guess>({ name: "" });
const [guesses, setGuesses] = useState<Guess[]>([]);
const [characters, setCharacters] = useState<Guess[]>([]);
let [nrguesses, setnrguesses] = useState(5);
const [suggestions, setSuggestions] = useState<Guess[]>([]);
const [highscore, sethighscore] = useState(0);
const [isMuted,setisMuted] = useState(true);
useEffect(() => {
  fetch("/charjson/db.json")
    .then((res) => res.json())
    .then((json) => {
     const data = Array.isArray(json) ? json : json.characters;
      setCharacters(data);
      const randomSolution = data[Math.floor(Math.random() * data.length)];
      console.log(characters);
      setSolution(randomSolution);
    });

}, []);

const audio = new Audio("/ost/chillchaker.mp3");
audio.volume = 0.5;
audio.loop = true;


const muteMusic = () => {
    audio.volume = 0.5;
    audio.play(); // Resume playback if needed
    setisMuted(!isMuted);
  }


const restartGame = () => {
  // Pick a new random solution
  const newSolution = characters[Math.floor(Math.random() * characters.length)];
  setSolution(newSolution);
  // Reset everything else
  setGuesses([]);
  setGuess({ name: "" }); // or "" if guess is just a string
  setnrguesses(5);       // if you're tracking attempts
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
  sethighscore(0);
  restartGame()
  }
  setGuess({name:""}); // clear input
    
};

function normalizeTags(value: string | number | string[] | undefined): string[] {
  if (!value && value !== 0) return [];

  if (Array.isArray(value)) {
    return value.map(tag => tag.toString().toLowerCase().trim());
  }

  // If it's a number, convert to string
  const str = value.toString();

  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split CamelCase
    .split(/[,\s]+/) // split on comma or space
    .map(tag => tag.toLowerCase().trim())
    .filter(Boolean);
}

function compareGuessToSolution(guess: Guess, solution: Guess): Record<string, string[]> {
  const fieldsToCompare: (keyof Guess)[] = ['gender','tag', 'imp'];
  const result: Record<string, string[]> = {};

  fieldsToCompare.forEach((field) => {
    const guessTags = normalizeTags(guess[field]);
    const solutionTags = normalizeTags(solution[field]);

    result[field] = guessTags.map(tag => solutionTags.includes(tag) ? 'green' : 'red');
  });

  return result;
}

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
  <div className='flex'>
     <div className="flex flex-col w-screen h-screen z-1 bg-[url('/bg/lc.jpg')] bg-no-repeat bg-cover pt-10 pl-30">
      <div className='flex '>
        <div className='absolute top-0 left-100 '>
        <img src="/bg/connect.png" className='h-20 '></img>
        </div>
        <div className='absolute top-0 right-100 '>
        <img src="/bg/connect.png" className='h-20 '></img>
        </div>
        <div className='absolute -left-9 top-20 z-2'>
        <img src="/bg/conleft.png" className='w-50 h-20  '></img>
        </div>
          <div className='absolute -left-9 top-50 z-2'>
        <img src="/bg/conleft.png" className='w-50 h-20 scale-y-[-1] '></img>
        </div>
        <div className='absolute -left-9 bottom-50 z-2'>
        <img src="/bg/conleft.png" className='w-50 h-20  '></img>
        </div>
        <div className='absolute -left-9 bottom-20 z-2'>
        <img src="/bg/conleft.png" className='w-50 h-20 scale-y-[-1] '></img>
        </div>
  { nrguesses!=0 && 
        
        <div className="flex flex-col bg-[url('/bg/box.png')] mt-10 z-3 bg-no-repeat bg-[length:100%_100%] min-h-full min-w-full p-10">
          <div className="flex flex-col top-4 left-4">
            <div className="flex flex-row">
              <LimButton onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Back</h1>
  </LimButton>
<LimButton onClick={restartGame} >
  <h1 className="text-2xl font-bold mb-4 text-center">Restart Game</h1>
</LimButton>
<div>
  {isMuted && 
<LimButton onClick={muteMusic} >
  <h1 className="text-2xl font-bold mb-4 text-center ">Play Music</h1>
</LimButton>
}
</div>
<div>
  {nrguesses==0 && <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">You Lost, it was {solution?.name}</h1>}
</div>
  <div className="flex flex-row items-center">
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Guesses Left: {nrguesses}</h1>
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Score: {highscore}</h1>
   </div>
            <div className=" bg-[url('/bg/enter.png')]
             text-yellow-500 bg-[length:100%_100%] bg-no-repeat rounded-lg
              p-4 mb-4 h-[100px] flex items-center justify-end
               text-right text-3xl">
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
      right-0
      top-full
      pt-5
      pb-5
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
          className='flex flex items-center space-x-4 p-2 hover:bg-gray-700 cursor-pointer min-w-100 '
          onMouseDown={e => e.preventDefault()} // Prevent input blur on click
        >
            <span><img src={char?.imgsrc} alt={char?.name} className="w-25 h-20" /></span>
          <span className='flex flex-wrap text-sm leading-tight break-words'>{char.name}</span>
        </li>
        </div>
      ))}
    </ul>
 
  )}
</div>
            </div>
            
 
    </div>  
            <div className="bg-[url('/bg/solbox.png')] bg-no-repeat bg-[length:100%_100%] 
            bg-origin-border 
            text-white rounded-lg z-0 -mb-10 
            pl-20 pr-10 pt-10 pb-10 
            h-[350px] overflow-y-auto text-l ">
  {guesses.length === 0 ? (
    <p className="text-white"><b>No guesses yet.</b></p>
  ) : (
 <ul className='flex flex-col gap-4'>
  {guesses.map((g, i) => {
  const guessNumber = guesses.length - i;
  const matchResults = solution ? compareGuessToSolution(g, solution) : {};

  return (
    <li key={i} className="flex flex-wrap flex-row
    bg-[url('/bg/sinnerbox.png')] bg-no-repeat bg-[length:120%_100%]  bg-origin-border 
    space-x-4 items-right pl-20 py-2 ">
      <span className="font-bold">#{guessNumber}</span>
      <span><img src={g?.imgsrc} alt={g?.name} className="w-25 h-20" /></span>
      <strong>Name:</strong>
      <span className={matchResults.name ? "text-green-500" : "text-red-500"}>
         {g.name}
      </span>

      {g.gender && (
  <span>
    <strong>Gender: </strong>
    {normalizeTags(g.gender).map((tag, i) => (
      <span
        key={i}
        className={matchResults.platform ?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
  </span>
)}

{g.tag && (
  <span>
    <strong>Tags: </strong>
    {normalizeTags(g.tag).map((tag, i) => (
      <span
        key={i}
        className={matchResults.platform ?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
  </span>
)}

       {g.start !== undefined && (

          <span className={g.start === solution?.start ? "text-green-500" : "text-red-500"}>
            <em>First Appeared in: {g.start}
            {solution?.start !== undefined && (
             g.start < solution.start? " ↑↑↑" :
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
          }
          </div>
          <div className="flex flex-col justify-center items-center mt-1">
          <h1 className="text-2xl font-bold mt-6 items-center text-white pl-4">The Rule for importance is:</h1>
          <h1 className="text-2xl font-bold mb-4 items-center text-yellow-500 pl-4">Fodder &lt; NPC &lt; MiniBoss &lt; MainBoss &lt; Main Character </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Limbus