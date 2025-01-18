import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Chess from '../pages/Chess'
import Home from '../pages/Home'

function App() {

  return (
    <>
      <Routes>
      <Route path={'/'} element={<Home/>}/>
        <Route path={'chess'} element={<Chess/>}/>
      </Routes>
    </>
  )
}

export default App
