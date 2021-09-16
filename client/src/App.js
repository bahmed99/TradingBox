import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import About from './pages/About'
// import Technologies from './pages/Technologies';
import Login from './pages/Login';
// import Tutorial from './pages/Tutorial'
import ResetPassword from "./pages/ResetPassword"
import CodeValidation from "./pages/CodeValidation"
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route exact path="/"><Home/></Route> */}
          {/* <Route exact path="/about"><About/></Route> */}
          {/* <Route exact path="/technologies"><Technologies/></Route> */}
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/signup"><SignUp/></Route>
          {/* <Route exact path="/tutorial"><Tutorial/></Route> */}
          <Route exact path="/resetPassword"><ResetPassword/></Route>
          <Route exact path="/codeValidation"><CodeValidation/></Route>
        </Switch>
      </Router>    
    </>
  );
}

export default App;
