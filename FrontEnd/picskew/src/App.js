import logo from './logo.svg';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Login from './Components/home/Login'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/home/Signup'
import Viewer from'./Components/Viewer/Viewer'
import Uploaderhome from './Components/Uploaer/Uploderhome'
import Createpost from './Components/Uploaer/Createpost'
import View from './Components/Uploaer/View'
import Edit from './Components/Uploaer/Edit'
function App() {
  window.history.forward();

    function noBack() {

      window.history.forward();

  }
  return (
    <div className="App">
  <Routes> 
    <Route exact path='/' element={< Login />}></Route>
    <Route exact path='/Signup' element={< Signup />}></Route>
    <Route exact path="/viewer" element={< Viewer />}></Route>
    <Route exact path='/uploder' element={< Uploaderhome />}></Route>
    <Route exact path='/createpost/:id' element={< Createpost />}></Route> 
     <Route exact path='/view/:id' element={< View />}></Route> 
     <Route exact path='/edit/:id' element={< Edit />}></Route> 
   </Routes>
    </div>
  );
}

export default App;
