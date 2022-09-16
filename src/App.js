import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/'>
            <Route path='signup' element={<Signup/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
