import { Button } from "../UI/Button"

const home = () => {
  return (
       <div className="flex flex-col min-h-screen bg-black">
      <div className="w-full h-[50vh] flex items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-600">
        <h1 className="text-4xl font-bold text-center text-fuchsia-200 px-4">
          Greetings, dear guest, to the ProjectMoonWordle Project ! May you find your "fixer" in this place...
        </h1>
      </div>
      <div className = "flex flex-row items-center justify-center mt-8 gap-4" >
        <Button onClick={() => window.location.href = '/calculator'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Limbus Wordle</h1>
        </Button>
        <Button onClick={() => window.location.href = '/calculatorstiintific'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Library of Ruina Wordle</h1>
        </Button>
        <Button onClick={() => window.location.href = '/calculatorstiintific'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Lobotomy Corporation Wordle</h1>
        </Button>
      </div>
    </div>
    
  )
}

export default home
