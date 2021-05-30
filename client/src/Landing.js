import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./Landing.css";

const Landing = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //Checks if inputted user exists and the password matches.
  async function login(username, password) {
    var res = await fetch(`/login/${username}/${password}`);
    var data = await res.json();
    var result = false;
    if (data.match) {
      result = true;
      setUserID(data.id);
    } else {
      result = "Username/Password is invalid.";
    }
    return result;
  }

  //Checks if inputted username exists, if not then account is created.
  async function signup(username, password) {
    var result = false;
    var res = await fetch(`/users/${username}/${password}`, { method: "post" });
    if (res.status == 201) {
      result = true;
    } else if (res.status == 409) {
      result = await res.text();
    } else {
      result = "An unknown error occured while creating a new user.";
    }
    return result;
  }

  // If user succesfully logs in or creates account, then user will be redirected to home page and state is lifted up to App component.
  if (loggedIn == true) {
    props.setusername(username);
    props.setuserid(userID);
    return (
      <Route>
        <Redirect to="/home" />
      </Route>
    );
  } else {
    return (
      <div className="landingDiv">
        <h1 className="headerText">Color Pal-ette</h1>
        <div className="formDiv">
          <form className="form">
            <h2>{errMsg}</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <div className="buttonDiv">
              <button
                className="formButt"
                onClick={async (e) => {
                  e.preventDefault();
                  var result = await login(username, password);
                  if (result == true) {
                    setLoggedIn(true);
                  } else {
                    setErrMsg(result);
                  }
                }}
              >
                <h2>Login</h2>
              </button>
              <button
                className="formButt"
                onClick={async (e) => {
                  e.preventDefault();
                  var result = await signup(username, password);
                  if (result == true) {
                    var result2 = await login(username, password);
                    if (result2 == true) {
                      setLoggedIn(true);
                    } else {
                      setErrMsg(result2);
                    }
                  } else {
                    setErrMsg(result);
                  }
                }}
              >
                <h2>Sign Up</h2>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Landing;
