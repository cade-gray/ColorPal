import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Link
    
} from "react-router-dom";
import './Palette.css'
const Palette = (props) => {
    // Makes sure that the correct amount of colors are being rendered out for a palette
    if(props.count == 1){
        return(
            <div className="palette-comp">
                <PaletteInfo name={props.name} creator={props.creator} paletteid={props.paletteid} likerid={props.likerid} likerusername={props.likerusername} update={props.update} />
                <div className="palette" >
                <div style={{background: props.color1}}><h4>{props.color1}</h4></div>
                </div>
            </div>
        )
    }
    else if(props.count == 2){
        return(
            <div className="palette-comp">
                <PaletteInfo name={props.name} creator={props.creator} paletteid={props.paletteid} likerid={props.likerid} likerusername={props.likerusername} update={props.update} />
                <div className="palette" >
                    <div style={{background: props.color1}}><h4>{props.color1}</h4></div>
                    <div style={{background: props.color2}}><h4>{props.color2}</h4></div>
                </div>
            </div>
        )
    }
    else if(props.count == 3){
        return(
            <div className="palette-comp">
                <PaletteInfo name={props.name} creator={props.creator} paletteid={props.paletteid} likerid={props.likerid} likerusername={props.likerusername} update={props.update} />
                <div className="palette" >
                    <div style={{background: props.color1}}><h4>{props.color1}</h4></div>
                    <div style={{background: props.color2}}><h4>{props.color2}</h4></div>
                    <div style={{background: props.color3}}><h4>{props.color3}</h4></div>
                </div>
            </div>
        )
    }
    else if(props.count == 4){
        return(
            <div className="palette-comp">
                <PaletteInfo name={props.name} creator={props.creator} paletteid={props.paletteid} likerid={props.likerid} likerusername={props.likerusername} update={props.update} />
                <div className="palette" >
                    <div style={{background: props.color1}}><h4>{props.color1}</h4></div>
                    <div style={{background: props.color2}}><h4>{props.color2}</h4></div>
                    <div style={{background: props.color3}}><h4>{props.color3}</h4></div>
                    <div style={{background: props.color4}}><h4>{props.color4}</h4></div>
                </div>
            </div>
        )
    }
    else if(props.count == 5){
        return(
            <div className="palette-comp">
                <PaletteInfo name={props.name} creator={props.creator} paletteid={props.paletteid} likerid={props.likerid} likerusername={props.likerusername} update={props.update} />
                <div className="palette" >
                    <div style={{background: props.color1}}><h4>{props.color1}</h4></div>
                    <div style={{background: props.color2}}><h4>{props.color2}</h4></div>
                    <div style={{background: props.color3}}><h4>{props.color3}</h4></div>
                    <div style={{background: props.color4}}><h4>{props.color4}</h4></div>
                    <div style={{background: props.color5}}><h4>{props.color5}</h4></div>
                </div>
            </div>
        )
    }
}

const PaletteInfo = (props) => {
    const [paletteID] = useState(props.paletteid);
    const [likerID] = useState(props.likerid);
    const [creator] = useState(props.creator)
    const [likerUsername] = useState(props.likerusername);
    const [liked, setLiked] = useState(false)
    const [likeText, setLikeText] = useState("Like")
    const [likeID, setLikeID] = useState(null)
    
    useEffect(() => {
        // Checks if the palette has already been liked
        async function likeCheck(){
            var result = false;
            var res = await fetch(`/likes/${likerID}/${paletteID}`);
            var data = await res.json()
            if(data.length != 0){
                result = true;
                setLikeText("Unlike")
                setLiked(true)
            }
        }
        // Only runs likeCheck if the logged in user is viewing a palette not created by them
        if(likerUsername != creator){
            likeCheck()
        }
    },[])

    // Sends request to API to add a like to the database 
    async function likePalette(){
        var result = false;
        var res = await fetch(`/likes/${likerID}/${paletteID}`, {method: "post"});
        if(res.status == 201){
            result = true;
        }
        else if(res.status == 500)
        {
            result = await res.text()
        }
        else{
            result = "An unknown error occured while creating a new like."
        }
        return result;
    }

    // Sends request to API to remove a like from the database 
    async function unlikePalette(){
        var result = false;
        var res = await fetch(`/likes/${likerID}/${paletteID}`, {method: "delete"});
        if(res.status == 200){
            result = true;
        }
        else if(res.status == 500)
        {
            result = await res.text()
        }
        else{
            result = "An unknown error occured while removing a like"
        }
        return result;
    }

    // Sends request to API to remove a palette from the database
    async function deletePalette(){
        var result = false;
        var res = await fetch(`/palettes/${paletteID}`, {method: "delete"});
        if(res.status == 200){
            result = true;
        }
        else if(res.status == 500)
        {
            result = await res.text()
        }
        else{
            result = "An unknown error occured while deleting the palette."
        }
        return result;
    }

    // View for a palette that does not belong to logged in user
    if(likerUsername != creator){
        return(
            <div className="info">
                <h2 className="paletteName">{props.name}</h2>
                <Link to={`/user-profile/${creator}`} >
                    <button className="creatorButt"><h3>{creator}</h3></button>
                </Link>
                <button 
                    className="likeButt" 
                    onClick={async () => {
                        var res = null;
                        if(liked){
                            res = await unlikePalette()
                            setLiked(false)
                            setLikeText("Like")
                        }
                        else{
                            res = await likePalette()
                            setLiked(true)
                            setLikeText("unlike")
                        }
                    }}
                ><h3>{likeText}</h3></button>
            </div>
        )
    }
    // View for a palette that belongs to logged in user
    else{
        return(
            <div className="info">
                <h2 className="paletteName">{props.name}</h2>
                <button 
                    className="deleteButt" 
                    onClick={async () => {
                        await deletePalette()
                        props.update()
                    }}
                ><h3>Delete</h3></button>
            </div>
        )
    }
}

export default Palette;