import { LimButton } from "../UI/limButton"
import {LinkButton} from "../UI/LinkButton"
const home = () => {
  return (
       <div className="flex flex-row min-h-screen bg-black">
     
      <div className = "flex flex-col items-center justify-center mt-8 gap-4 px-10" >
        <LimButton onClick={() => window.location.href = '/limbus'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Limbus Wordle</h1>
        </LimButton>
        <LinkButton onClick={() => window.location.href = '/link'}>
          <h1 className="text-2xl font-bold mb-4 text-center text-lime-500">Guess the Link</h1>
        </LinkButton>
      </div>
       <div className="w-full h-[50vh] flex items-center justify-center bg-gradient-to-b from-black-600 to-yellow-800">
        <h1 className="text-4xl font-bold text-center text-amber-500 px-4">
          Greetings, dear guest, to the ProjectMoonWordle Project ! May you find your "fixer" in this place...
        </h1>
      </div>
    </div>
    
  )
}

export default home
