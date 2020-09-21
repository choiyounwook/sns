import React from "react";
import Bar from "./Bar";
import useAudioPlayer from './useAudioPlayer';
import styled from "styled-components";



const AudioBox = styled.div`
  width:100%;
  height:86vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:600px;
    height:600px;
  }
`
const ControlBox = styled.div`
  width:100%;
  height:100%;
  position:relative;
`

const Button = styled.button`
  width: 20vw;
  height: 20vw;
  border: 0;
  position: absolute;
  top: 30vw;
  left: 33vw;
`

const Audio = ({audioURL, imgURL, audioID}) => {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer(audioID);

  return (
    <AudioBox style={{backgroundImage: `url(${imgURL})`,
    backgroundSize: `contain`,
    backgroundRepeat: `norepeat`, backgroundPosition: `center`,}} onClick={() => setPlaying(!playing)}>
      <audio id={audioID}>
        <source src={audioURL} />
      </audio>
      {/* <ControlBox>
        {playing ? 
          <Button>정지</Button> :
          <Button>재생</Button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </ControlBox> */}
    </AudioBox>
  );
}

export default Audio;
