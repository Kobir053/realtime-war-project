import { Route, Routes } from 'react-router';
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import PrivatePage from './pages/privatePage/PrivatePage';
import DefencePage from './components/defencePage/DefencePage';
import AttackPage from './components/attackPage/AttackPage';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/war' element={<PrivatePage/>}/>
      </Routes>
    </div>
  )
}

export default App
