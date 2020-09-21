import React from "react";
import Bar from "./Bar";
// import useVideoPlayer from './useVideoPlayer';
import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Post from "../Post";
import {VideoIcon, HeartFull, CommentFull} from "../Icons"



const Overlay = styled.div`
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.3s linear;
    svg {
      fill: white;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display:none;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display:none;
  }
`;


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


function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const ListItem = styled.div`
  width:200px;
  height:200px;
  position:absolute;
  @media only screen and (max-width:${(props) => props.theme.sm}){
    width:32vw;
    height:32vw;
  }
`
const BigBox = styled.div`
  position:relative
`
const VideoBox = styled.div`
  width:100%;
  position:relative;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    &:hover {
      ${Overlay} {
        opacity: 1;
      }
    }
  }
`
const VideoContent = styled.video`
  width:100%;
  height: -webkit-fill-available;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
  }
`


const PostModal = ({post, file}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <VideoBox onClick={() => dispatch({ type: "open", size: "tiny" })}></VideoBox>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
        <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            category={post.category}
            prePostCount={post.prePostCount}
            nextPostCount={post.nextPostCount}
            nextPosts = {post.nextPosts}
            prePosts = {post.prePosts}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};



const SquareVideo = ({videourl, post, likeCount, commentCount}) => {
  // const { curTime, duration, playing, setPlaying, setClickedTime } = useVideoPlayer();

  return (
    <VideoBox>
              <VideoIcon 
            position="absolute"
            right = "0"
            width = "20%"
            height = "20%"
            />
      <VideoContent>
        <source src={videourl} />
      </VideoContent>
                <Overlay>
      <Number>
        <HeartFull />
        <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <CommentFull />
        <NumberText>{commentCount}</NumberText>
      </Number>
    </Overlay>
    </VideoBox>
  );
}

export default SquareVideo;
