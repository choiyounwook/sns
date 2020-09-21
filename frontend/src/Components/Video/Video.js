import React from "react";
import Bar from "./Bar";
import useVideoPlayer from './useVideoPlayer';
import styled from "styled-components";



const VideoBox = styled.div`
  width:100%;
  height:100vw;
  max-height: 400px;
  position:relative;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:400px;
    height:400px;
  }
`
const ControlBox = styled.div`
  width:100%;
  height:100%;
  
`

const Button = styled.button`
  width: 20vw;
  height: 20vw;
  border: 0;
  position: absolute;
  top: 30vw;
  left: 33vw;
`

const VideoContent = styled.video`
  width:100%;
  height:100vw;
  max-height: 400px;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    height:100%;
  }
`

const Video = ({videoURL, videoID}) => {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useVideoPlayer(videoID);

  return (
    <VideoBox onClick={() => setPlaying(!playing)}>
      {/* <video id={videoID} width="100%">
        <source src={videoURL} />
      </video> */}
      <VideoContent id={videoID}>
        <source src={videoURL} />
      </VideoContent>
      {/* <ControlBox>
        {playing ? 
          <Button>정지</Button> :
          <Button>재생</Button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </ControlBox> */}
    </VideoBox>
  );
}

export default Video;
