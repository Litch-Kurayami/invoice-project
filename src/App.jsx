import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Registro from './Components/Registro'
import Login from './Components/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
