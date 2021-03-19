import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
import Palette from './Palette'
import './UserProfile.css'
const UserProfile = (props) => {
    let { creator } = useParams(); // The owner of the profile that is being visited
    const [username, setUsername] = useState(props.username) // The logged in user
    const [userID] = useState(props.userid)
    const [palettes, setPalettes] = useState([])
    
    useEffect(() => {
        // Request all the palettes created by the specified user who owns the profile from the API
        async function fetchPalettes(uname){
            let res = await fetch(`/palettes/${uname}`);
            let data = await res.json()
            console.log(data)
            setPalettes(data)
        }
        setUsername(props.username)
        if(username){
            fetchPalettes(creator)
        }
    },[props.username])

    if(!username){
        return(
            <Route>
                <Redirect to="/" />
            </Route>
        )
    }
    else{
        return (
            <div className="userProfileDiv">
                <h1>Palettes by {creator}</h1>
                {
                    palettes.map((palette) => {
                        return <Palette name={palette.name} paletteid={palette._id} likerid={userID} likerusername={username} creator={palette.creator} count={palette.count} color1={palette.color1}  color2={palette.color2}  color3={palette.color3}  color4={palette.color4}  color5={palette.color5} /> 
                    })
                }
            </div>
        );
    }
};

export default UserProfile;