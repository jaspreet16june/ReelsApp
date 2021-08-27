import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth, firestore, storage } from "../firebase";
import "./Home.css"

import VideoCard from "./VideoCard";
let Home = () =>{
    let user = useContext(authContext)
    console.log(user);
    let [posts,setPosts] = useState([]);


    useEffect(()=>{
            firestore.collection("popst").onSnapshot((querySnapshot)=>{
                let docArr = querySnapshot.docs;
                let arr = [];

                for(let i = 0;i<querySnapshot.docs.length;i++){

                    arr.push({
                        id :docArr[i].id,
                        ...docArr[i].data()
                    });
                }
                    setPosts(arr);
                })
                
    },[])
    return <>
        {(user)? " " : <Redirect to ="/Login"/>}
        <div className = "video-container">
         {  posts.map((el)=>{
            return <VideoCard data = {el}/>
         
           })
        }
        </div>
        
        <button className="material-icons-outlined home-logout-btn" onClick={()=>{
           auth.signOut();
        }}>logout</button>
        <input className ="upload-file" type ="file"
                onClick={(e)=>{
                    e.currentTarget.value = null;
                }}
                onChange={(e)=>{
                    let videoObj  = e.currentTarget.files[0];
                    
                    let{name,size,type} = videoObj;
                    size = size /1000000;
                    if(size > 10){
                        alert("File size exceeded 10mb");
                        return;
                    }
                    type = type.split("/")[0];

                    if(type !== "video"){
                        alert("Please upload a video file");
                        return;
                    }

                    let uploadTask = storage.ref(`/post/${user.uid}/${Date.now()+"-"+name}`).put(videoObj);
                    uploadTask.on("state_change",null,null,()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                            console.log(url);


                        firestore.collection("posts").add({
                            name:user.displayName,url ,like:[] ,comment :[]
                        })
                        })
                        
                    })

                }}
                choose me  />
          </>
}

export default Home;