import { useState, useEffect} from 'react'
import { LinkButton } from "../UI/LinkButton"

// Limbus page
const Link = () => {

type Guess = {
  id?:number;
  name: string;
  year?:number;
  platform?: string;
  age?:string | string[];
  signature?: string | string[];
  visual?: string | string[];
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
  fetch("/charjson/link.json")
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
  const fieldsToCompare: (keyof Guess)[] = ['age', 'visual', 'signature', 'platform'];
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
    
 <div className="flex absolute top-4 left-4">
 <LinkButton onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Back</h1>
  </LinkButton>
<LinkButton onClick={restartGame} >
  <h1 className="text-2xl font-bold mb-4 text-center">Restart Game</h1>
</LinkButton>
<div>
  {isMuted && 
<LinkButton onClick={muteMusic} >
  <h1 className="text-2xl font-bold mb-4 text-center ">Play Music</h1>
</LinkButton>
}
</div>
  <div className="flex flex-col items-center">
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Guesses Remaining: {nrguesses}</h1>
   <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">Score: {highscore}</h1>
   </div>
<div>
  {nrguesses==0 && <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">You Lost, it was {solution?.name}</h1>}
</div>
  </div>
      <div className="flex  flex-col min-h-screen bg-[url('/bg/zeldabg.jpg')] pt-30 pl-10 pr-10">
      <div>
  { nrguesses!=0 && 
        <div className='bg-[#085b08] rounded-lg shadow-lg min-h-full min-w-full p-6'>
          <div>
            <div className='bg-[#aeaeae] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
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
      w-1/3
      max-h-50
      overflow-y-scroll
      bg-green-900
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
          
          <span className='flex flex-wrap text-sm leading-tight break-words'>{char.name}</span>
        </li>
        </div>
      ))}
    </ul>
 
  )}
</div>
            </div>
            <div className='bg-[#aeaeae] text-white rounded-lg p-4 h-[340px] overflow-y-auto text-xl pr-2'>
  {guesses.length === 0 ? (
    <p className="text-green-900"><b>No guesses yet.</b></p>
  ) : (
 <ul className='p-10'>
  {guesses.map((g, i) => {
  const guessNumber = guesses.length - i;
  const matchResults = solution ? compareGuessToSolution(g, solution) : {};

  return (
    <li key={i} className="flex flex-wrap space-x-4 items-center rounded px-3 py-2 border-2 border-black">
      <span className="font-bold">#{guessNumber}</span>

      <span className={matchResults.name ? "text-green-500" : "text-red-500"}>
        <strong>Game:</strong> {g.name}
      </span>

      {g.platform && (
  <span>
    <strong>Platform: </strong>
    {normalizeTags(g.platform).map((tag, i) => (
      <span
        key={i}
        className={matchResults.platform ?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
  </span>
)}

       {g.year !== undefined && (
          <span className={g.year === solution?.year ? "text-green-500" : "text-red-500"}>
            <em>Released: {g.year}
            {solution?.year !== undefined && (
             g.year < solution.year? " ↑↑↑" :
             g.year > solution.year ? " ↓↓↓" : ""
            )}
            </em>
          </span>
        )}

          {g.signature && (
  <span>
    <strong>Main Signature Items: </strong>
    {normalizeTags(g.signature).map((tag, i) => (
      <span
        key={i}
        className={matchResults.signature?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
  </span>
)}

     {g.visual && (
  <span>
    <strong>Visual: </strong>
    {normalizeTags(g.visual).map((tag, i) => (
      <span
        key={i}
        className={matchResults.visual?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
  </span>
)}

     {g.age && (
  <span>
    <strong>Age: </strong>
    {normalizeTags(g.age).map((tag, i) => (
      <span
        key={i}
        className={matchResults.age?.[i] === 'green' ? 'text-green-500' : 'text-red-500'}
      >
        {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
      </span>
    ))}
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
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4 items-center text-white pl-4">The Rule for importance is:</h1>
          <h1 className="text-2xl font-bold mb-4 items-center text-yellow-500 pl-4">HAVE FUN HYAH HAH HYAH HYAH RAH</h1>
          </div>
        </div>
      
    </>
  )
}

export default Link