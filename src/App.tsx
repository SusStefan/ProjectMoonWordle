
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Allroutes } from './routes/Allroutes'
function App() {
  

  return (
    <>
      <RouterProvider router = {Allroutes} />
    </>
  )
}

export default App
