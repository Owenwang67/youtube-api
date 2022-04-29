import "./styles.css";
import React, { useState, useEffect } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import youtube from "../api/youtube";

const VideoItem = ({ video }) => {
  const [channelData, setChannelData] = useState(null);
  const { REACT_APP_API_KEY } = process.env;

  useEffect(() => {
    async function fetchData() {
      const {
        data: { items: channelData },
      } = await youtube.get("channels", {
        params: {
          part: "snippet",
          id: video.snippet.channelId,
          fields: "items/snippet/thumbnails",
          key: REACT_APP_API_KEY,
        },
      });

      // console.log("channel data:", channelData);

      setChannelData(channelData);
    }
    fetchData();
  }, [video, REACT_APP_API_KEY]);

  return (
    <div className="thumbnail-container">
      <div className="thumbnail-wrapper">
        <img
          className="thumbnail"
          src={video.snippet.thumbnails.medium.url}
          alt="thumbnail"
        />
        <div className="thumbnail-info">
          <img
            className="avatar-wrapper"
            src={channelData && channelData[0].snippet.thumbnails.default.url}
            alt="avatar"
          />
          <div className="thumbnail-description">
            <div className="thumbnail-text">{video.snippet.title}</div>
            <div className="thumbnail-text">{video.snippet.channelTitle}</div>
            <div className="thumbnail-text">{video.snippet.publishedAt}</div>
          </div>
        </div>
        <div className="thumbnail-hidden">
          <div className="thumbnail-add">
            <QueryBuilderIcon id="icon" />
            <span>WATCH LATER</span>
          </div>
          <div className="thumbnail-add">
            <FormatIndentIncreaseIcon id="icon" />
            <span>ADD TO QUEUE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
