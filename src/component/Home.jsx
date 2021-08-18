import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth } from "../firebase";
import "./Home.css"

import VideoCard from "./VideoCard";
let Home = () =>{
    let user = useContext(authContext)
    console.log(user);
    return <>
        {(user)? " " : <Redirect to ="/Login"/>}
        <div className = "video-container">
            <VideoCard />
        </div>
        
        <button className="material-icons-outlined home-logout-btn" onClick={()=>{
           auth.signOut();
        }}>logout</button>
    </>
}

export default Home;