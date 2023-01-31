import React from "react"
import Youtube from 'react-youtube';
import'../styles/PopUp.css';
import {CgClose} from 'react-icons/cg';

const PopUp =(props)=>{
    return(props.triggered?
    <div className="popup">
        <CgClose className="x-button" size={30} color={"white"} onClick={(e)=>{props.setTrigger(false)}}/>
        <Youtube className="youtube-vid" videoId={props.trailer}/>
    </div>
    : 
    "")
}
export default PopUp 