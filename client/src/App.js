import React, { useState } from 'react';
import './App.css';
import Home from './Home'
import MyProfile from './MyProfile'
import UserProfile from './UserProfile'
import PaletteForm from './PaletteForm'
import Landing from './Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  const [username, setUsername] = useState(""); //The logged in user
  const [userID, setUserID] = useState("");

  function logout(){
    setUsername(null)
    setUserID(null)
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing username={username} setusername={setUsername} setuserid={setUserID} />
          </Route>
          <Route path="/home">
            <MyHeader logout={logout} />
            <Home username={username} userid={userID} />
          </Route>
          <Route path="/my-profile">
            <MyHeader logout={logout} />
            <MyProfile username={username} userid={userID} />
          </Route>
          <Route path="/user-profile/:creator">
            <MyHeader logout={logout} />
            <UserProfile username={username} userid={userID} />
          </Route>
          <Route path="/palette-form">
            <MyHeader logout={logout} />
            <PaletteForm username={username} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const MyHeader = (props) => {
  return(
    <header className="header">
          <Link to="/home" style={{textDecoration: 'none'}}>
            <h1 className="headerText" >Color Pal-ette</h1>
          </Link>
          <div className="userButtDiv" >
            <Link to="/my-profile">
              <button className="headerButt profileButt">
                <span className="buttText">Profile</span>
                <span className="hoverIcon">👤</span>
              </button>
            </Link>
            <button className="headerButt logoutButt" onClick={()=>props.logout()}>
                <span className="buttText">Logout</span>
                <span className="hoverIcon">👋🏻</span>
            </button>
            <Link to="/palette-form">    
              <button className="headerButt createButt">
                <span className="new">New Palette</span>
                <span className="plus">+</span>
              </button>
            </Link>
          </div>  
    </header>
  )
}

export default App;
