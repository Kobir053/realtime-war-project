import { Route, Routes } from 'react-router';
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
