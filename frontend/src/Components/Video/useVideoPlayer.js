import { useState, useEffect } from "react";

function useVideoPlayer(videoID) {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const video = document.getElementById(videoID);

    // state setters wrappers
    const setVideoData = () => {
      setDuration(video.duration);
      setCurTime(video.currentTime);
    }

    const setVideoTime = () => setCurTime(video.currentTime);

    // DOM listeners: update React state on DOM events
    video.addEventListener("loadeddata", setVideoData);

    video.addEventListener("timeupdate", setVideoTime);

    // React state listeners: update DOM on React state changes
    playing ? video.play() : video.pause();

    if (clickedTime && clickedTime !== curTime) {
      video.currentTime = clickedTime;
      setClickedTime(null);
    } 

    // effect cleanup
    return () => {
      video.removeEventListener("loadeddata", setVideoData);
      video.removeEventListener("timeupdate", setVideoTime);
    }
  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  }
}

export default useVideoPlayer;