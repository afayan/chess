import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Chess from '../pages/Chess'

function App() {

  return (
    <>
      <Routes>
      <Route path={'/'} element={<Chess/>}/>
        <Route path={'chess'} element={<Chess/>}/>
      </Routes>
    </>
  )
}

export default App
