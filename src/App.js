import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/editNotes' element={<Edit/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
