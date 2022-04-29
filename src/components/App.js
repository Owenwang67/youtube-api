import { useState, useEffect, useCallback } from "react";
import InfiniteLoader from "react-infinite-loader";
import ReactLoading from "react-loading";
import VideoList from "./VideoList";
import youtube from "../api/youtube";
import "./App.css";

function App() {
  const [videos, setVideos] = useState({ items: [], nextPageToken: null });
  const [page, setPage] = useState("");

  const { REACT_APP_API_KEY } = process.env;

  const handleVisit = () => {
    if (!videos.nextPageToken) return;

    const pageToken = videos.nextPageToken;
    setPage(pageToken);
  };

  useEffect(() => {
    async function fetchData() {
      const videoData = await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 30,
          q: "programming",
          pageToken: page,
          type: "video",
          order: "viewCount",
          key: REACT_APP_API_KEY,
        },
      });

      const newData = {
        ...videos,
        nextPageToken: videoData.data.nextPageToken,
        items: [...videos.items, ...videoData.data.items],
      };
      setVideos(newData);
    }

    fetchData();
  }, [page]);

  return (
    <div className="App">
      {videos && <VideoList videoData={videos.items} />}
      <InfiniteLoader onVisited={() => handleVisit()} />
      <div className="loading">
        <ReactLoading
          type={"spin"}
          color={"green"}
          height={"50px"}
          width={"50px"}
        />
      </div>
    </div>
  );
}

export default App;
