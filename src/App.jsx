import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Registro from './Components/Registro'
import Login from './Components/Login'
import HomeUsers from './Components/HomeUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductList from './Components/Admin/Productos/ProductList'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Home' element={<HomeUsers />}></Route>
        <Route path='/Productos' element={<ProductList />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
