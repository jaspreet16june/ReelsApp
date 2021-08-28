import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider";
import { firestore } from "../firebase";
import "./videoCard.css";
let VideoCard=(props)=>{
    let [comments,setComments] = useState([]);         
    let [playing ,setPlaying] = useState(false);
    let [commentIsOpen,setCommentIsOpen] = useState(false);
    let [currUserComment,   setCurrUserComment] = useState("");
    let user = useContext(authContext)
    
    useEffect(() => {
        let f = async () => {
          let commentsArr = props.data.comment;
          let arr = [];
          for (let i = 0; i < commentsArr.length; i++) {
            let commentDoc = await firestore
              .collection("comments")
              .doc(commentsArr[i])
              .get();
    
            arr.push(commentDoc.data());
          }
    
          setComments(arr);
        };
        f();
      }, [props]);
    return (
        
        
        <div className = "video-card">
            <p className="video-card-username">Fake-user</p>
            <span className = "video-card-music">
                <span className = "material-icons-outlined">music_notes</span>
                <marquee>Some song</marquee>
            </span>

            <span onClick ={()=>{
                if(commentIsOpen){
                    setCommentIsOpen(false);
               } else{
                   setCommentIsOpen(true);
               }
            }}
             className="material-icons-outlined video-card-chat">chat</span>
            <span className="material-icons-outlined video-card-like">favorite_border</span>

                {commentIsOpen ? (
                // <div className =" video-card-commentBox">
                //     <div className = "actual-comment">
                //         {
                //             comments.map((el)=>{
                //                 return ( 
                //         <div className = " post-user-comment">
                //             <img src ={el.photo}  alt =" " />
                //         <div>
                //         <h5>{el.name}</h5>
                //         <p>{el.comment}</p>
                //         </div>
                //       </div>  
                //         )
                //         </div>
                // })}
                // </div>
                <div className="video-card-comment-box">
                <div className="actual-comments">
                  {comments.map((el) => {
                    return (
                      <div className="post-user-comment">
                        <img src={el.photo} />
                        <div>
                          <h5>{el.name}</h5>
                          <p>{el.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                        <div className="comment-form">
                        <input type="text"  value = {currUserComment} onChange={(e)=>{
                            setCurrUserComment(e.currentTarget.value);
                        }}/>
                        <button onClick ={async ()=>{
                            let docRef = await firestore.collection("comments").add({
                                name: user.displayName,
                                comment:currUserComment,
                                photo: user.photoURL,
                            })
                            setCurrUserComment(" ");
                            let doc =await docRef.get();
                            let commentId = doc.id;
                            let postDoc = await firestore.collection("posts").doc(props.data.id).get();


                            let postCommentArr = postDoc.data().comment;

                            postCommentArr.push(commentId);

                            await firestore.collection("posts").doc(props.data.id).update({
                                comment: postCommentArr,
                            })

                        }}><span class="material-icons-outlined">
                        send
                        </span></button>
                        </div>
        
                     </div>   
            ) : (" ")}


            <video onClick={(e)=>{
                if(playing){
                    e.currentTarget.pause();
                    setPlaying(false);
                }else{
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }} 
            loop
            src = {props.data.url}
            className = "video-card-video">
            </video>

        </div>
    );
}
export default VideoCard ;