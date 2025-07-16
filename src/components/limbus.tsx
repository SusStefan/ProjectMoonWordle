import { useState } from 'react'
import { Keyboard } from '../UI/keyboard';
import { Button } from "../UI/Button"

// Componenta principala a calculatorului
const limbus = () => {
  return (
    <>
    
 <div className="flex absolute top-4 left-4">
 <Button onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Back</h1>
  </Button>
   <h1 className="text-2xl font-bold mb-4 items-center text-white">Limbus Wordle</h1>
  </div>
      <div className="flex flex-col min-h-screen bg-[#000000] pt-30">
        <div className='bg-[#d6b942] rounded-lg shadow-lg min-h-full min-w-full p-6'>
          <div>
            <div className='bg-[#707070] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
              <input className='allign-right w-full h-full bg-transparent outline-none text-right ' type="text" />
            </div>
            <div className='bg-[#707070] text-white rounded-lg p-4 h-[340px] flex items-center justify-center text-center text-xl'>
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default limbus