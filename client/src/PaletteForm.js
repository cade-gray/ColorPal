import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import './PaletteForm.css'
import { ChromePicker } from 'react-color';

const PaletteForm = (props) => {
    const [paletteName, setPaletteName] = useState("")
    const [color1, setColor1] = useState("#ffffff")
    const [color2, setColor2] = useState(null)
    const [color3, setColor3] = useState(null)
    const [color4, setColor4] = useState(null)
    const [color5, setColor5] = useState(null)
    const [creator, setCreator] = useState(props.username)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(()=>{
        setCreator(props.username)
    },[props.username])
    
    // If not logged in, redirect to landing page
    if(!creator){
        return(
            <Route>
                <Redirect to="/" />
            </Route>
        )
    }
    else{
        if(submitted == true){
            return(
                <Route>
                    <Redirect to="/home" />
                </Route>
            )
        }
        else{
            return (
                <div>
                    <div className="inputs">
                        <input 
                            type="text" 
                            className="palName" 
                            placeholder="Palette name" 
                            onChange={(e) => {setPaletteName(e.target.value)}}
                        />
                        <button 
                            className="submitButt" 
                            onClick={ async () => {
                                var res = await submitPalette(paletteName,creator,color1,color2,color3,color4,color5)
                                console.log(res)
                                if(res == true){
                                    setSubmitted(true)
                                }
                                else(
                                    alert(res)
                                )
                            }} 
                        ><h2>Submit</h2></button>
                    </div>
                    <div className="container">
                        <ColorInput color={color1} setColor={setColor1} hex={color1} number={1} />
                        <ColorInput color={(color2==null) ? "#cccccc" : color2} setColor={setColor2} hex={color2} number={2}/>
                        <ColorInput color={(color3==null) ? "#cccccc" : color3} setColor={setColor3} hex={color3} number={3}/>
                        <ColorInput color={(color4==null) ? "#cccccc" : color4} setColor={setColor4} hex={color4} number={4}/>
                        <ColorInput color={(color5==null) ? "#cccccc" : color5} setColor={setColor5} hex={color5} number={5}/>
                    </div>
                </div>
            );
        }
    }
};

const ColorInput = (props) => {
    const [colorID] = useState(`color${props.number}`)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    
    // Taken from react-color documentation
    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    return(
        <div className='color-box' id={colorID} style={{background: props.color}}>
            <button
                className="pickerButt" 
                onClick={ ()=> {
                    if(props.hex == null){
                        props.setColor("#ffffff")
                    }
                    setDisplayColorPicker(!displayColorPicker)
                }}
            >
                <h4>{(props.hex == null) ? "Add color" : "Change color"}</h4>
            </button>
            {(props.hex==null) ? null : (<h2 className="hexText" >{props.hex}</h2>)}
            {(displayColorPicker) ? 
                <div style={popover}>
                    <div style={ cover } onClick={()=>setDisplayColorPicker(false)}/>
                    <ChromePicker disableAlpha={true} color={props.color} onChange={(color) => props.setColor(color.hex)} />
                </div> 
              : null 
            }
        </div>
    )
    
}

// POSTS a created palette to the API
async function submitPalette(paletteName,creator,color1,color2,color3,color4,color5){
    var count = 0;
    var result = false;
    if(!paletteName){
        result = "Palette must have a name!"
    }
    else if(!color2 && !color3 && !color4 && !color5){
        count = 1
        color2 = color3 = color4 = color5 = "None";
    }
    else if(color2 && !color3 && !color4 && !color5){
        count = 2
        color3 = color4 = color5 = "None";
    }
    else if(color2 && color3 && !color4 && !color5){
        count = 3
        color4 = color5 = "None";
    }
    else if(color2 && color3 && color4 && !color5){
        count = 4
        color5 = "None";
    }
    else if(color2 && color3 && color4 && color5){
        count = 5
    }
    else{
        result = "Palette was not properly inputted, add colors from left to right leaving nothing empty in between colors."
    }
    //Check if Palette was correctly inputted
    if(result == false){
        color1 = encodeURIComponent(color1)
        color2 = encodeURIComponent(color2)
        color3 = encodeURIComponent(color3)
        color4 = encodeURIComponent(color4)
        color5 = encodeURIComponent(color5)
        var uri = `/palettes/${paletteName}/${creator}/${count}/${color1}/${color2}/${color3}/${color4}/${color5}/`
        var res = await fetch(uri, {method: "post"});
        var statusCode = res.status
        if(statusCode==201){
            result = true
        }
        else if(statusCode==500)
        {
            result = res.statusText
        }
        else{
            result = "An unknown error has occured"
        }
    }
    return result
}

export default PaletteForm;