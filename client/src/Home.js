import React, {useState, useEffect} from 'react';
import './Home.css'
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import Palette from './Palette'
  

const Home = (props) => {
    const [username, setUsername] = useState(props.username)
    const [userID] = useState(props.userid)
    const [palettes, setPalettes] = useState([])

    useEffect(() => {
        setUsername(props.username)
        if(username){
            fetchPalettes()
        }
    },[props.username]); // Essentially listens for when the username changes when the user logs out so state can be changed

    // Used to update page ONLY when a palette is deleted
    function update(){
        fetchPalettes()
    }

    // Requests all of the created palettes from the API
    async function fetchPalettes(){
        let res = await fetch("/palettes");
        let data = await res.json()
        setPalettes(data)
    }

    // If not logged in, redirect to landing page
    if(!username){
        return(
            <Route>
                <Redirect to="/" />
            </Route>
        )
    }
    else{
        return (
            <div className="homeDiv">
                <h1>Recent Palettes</h1>
                {
                    palettes.map((palette) => {
                        return <Palette key={palette._id} name={palette.name} paletteid={palette._id} likerid={userID} likerusername={username} creator={palette.creator} count={palette.count} color1={palette.color1}  color2={palette.color2}  color3={palette.color3}  color4={palette.color4}  color5={palette.color5} update={update}/> 
                    })
                }
            </div>
        );
    }
};

export default Home;