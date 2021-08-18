import "./videoCard.css";
let VideoCard=()=>{
    return (
        <div className = "video-card">
            <p className="video-card-username">Fake-user</p>
            <span className = "video-card-music">
                <span className = "material-icons-outlined">music_notes</span>
                <marquee>Some song</marquee>
            </span>

            <span class="material-icons-outlined video-card-chat">chat</span>
            <span class="material-icons-outlined video-card-like">favorite_border</span>
        </div>
    );
}
export default VideoCard ;