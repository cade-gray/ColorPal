import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import Palette from './Palette'
import './MyProfile.css'

const MyProfile = (props) => {
    const [username, setUsername] = useState(props.username)
    const [userID] = useState(props.userid)
    const [palettes, setPalettes] = useState([])
    const [likes, setLikes] = useState([])
    
    useEffect(() => {
        setUsername(props.username)
        if(username){
            fetchPalettes(username)
            fetchLikes(userID)
        }
    },[props.username]) // Essentially listens for when the username changes when the user logs out so state can be changed

    // Used to update page ONLY when a palette is deleted
    function update(){
        fetchPalettes(username)
    }

    // Request palettes that the logged in user has created from API
    async function fetchPalettes(uname){
        let res = await fetch(`/palettes/${uname}`);
        let data = await res.json()
        setPalettes(data)
    }

    // Request palettes that the logged in user has liked from API
    async function fetchLikes(userid){
        let res = await fetch(`/likes/${userid}`);
        let data = await res.json()
        let likedPals = []
        data.map((obj) =>{
            likedPals.push(obj.palette_id)
        })
        setLikes(likedPals)
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
            <div className="myProfileDiv">
                <div className="myPalsDiv">
                    <h1>My palettes</h1>
                    {
                        palettes.map((palette) => {
                            return <Palette  name={palette.name} paletteid={palette._id} likerid={userID} likerusername={username} creator={palette.creator} count={palette.count} color1={palette.color1}  color2={palette.color2}  color3={palette.color3}  color4={palette.color4}  color5={palette.color5} update={update} /> 
                        })
                    }
                </div>
                <div className="myLikesDiv">
                    <h1>My likes</h1>
                    {
                        likes.map((palette) => {
                            return <Palette  name={palette.name} paletteid={palette._id} likerid={userID} likerusername={username} creator={palette.creator} count={palette.count} color1={palette.color1}  color2={palette.color2}  color3={palette.color3}  color4={palette.color4}  color5={palette.color5} /> 
                        })
                    }
                </div>
            </div>
        );
    }
};

export default MyProfile;