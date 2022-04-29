import "./styles.css";
import VideoItem from "./VideoItem";

const VideoList = ({ videoData }) => {
  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-container">
      <div className="video-list-wrapper">
        {videoData.map((video, index) => (
          <VideoItem key={video.etag + index} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
