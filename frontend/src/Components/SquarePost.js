import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";
import { Link } from "react-router-dom";
import Post from "./Post";
import SquareVideo from"./SquareVideo/SquareVideo"
import {AudioIcon, VideoIcon, TextIcon, PhotoIcon, } from "./Icons"

const Overlay = styled.div`
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    position:absolute;
    top:0;
    transition: opacity 0.3s linear;
    svg {
      fill: white;
    }
  }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
        color:${props => props.color};
    }
    &:hover {
      text-decoration: none;
      color:white;
    }
`;

const Container = styled.div`
  background-image: url(${props => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: default;
  width:100%
  height:100%
  position:relative;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    &:hover {
      ${Overlay} {
        opacity: 1;
      }
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

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  border: none;
  vertical-align: baseline;
  color:white;
  background-color:${(props) => props.theme.livingCoral};
  padding: .78571429em 1.5em .78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  border-radius: .28571429rem;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  -webkit-tap-highlight-color: transparent;
  margin-left: .75em;
  margin-bottom: 15px
`

const TextBox = styled.div`
  height: 100%;
  text-align: center;
  text-decoration:none;
  // color:${props => props.color};
  font-size:31vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    font-size: 146px;
    line-height: 200px;
  }
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
  width:33%;
  height:33%;
  position:absolute;
  @media only screen and (max-width:${(props) => props.theme.sm}){
    width:32vw;
    height:32vw;
  }
`

const VideoBox = styled.div`
  width:100%;
  height:100%;
`


const PostModal = ({post, file}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <ListItem onClick={() => dispatch({ type: "open", size: "tiny" })}></ListItem>
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
            textContent = {post.textContent}
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


const SquarePost = ({ likeCount, commentCount, file, post, file1,files }) => {
  if (post.category === "audio") {
  return (
    <Link to={`/challengepost?${post.id}`}>
    <Container bg={files[1].url}>
      <AudioIcon
        position="absolute"
        right = "0"
        width = "20%"
        height = "20%"
        />
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
    </Container>
    </Link>
  )}
  else if (post.category ==="image") {
    return (
      <Link to={`/challengepost?${post.id}`}>
      <Container bg={file.url}>
        <PhotoIcon 
        position="absolute"
        right = "0"
        width = "20%"
        height = "20%"
        />
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
      </Container>
      </Link>
    );
  } else if (post.category ==="video") {
    console.log(files)
    return (
      <Link to={`/challengepost?${post.id}`}>
    <SquareVideo
    videourl={files[0].url}
    post={post}
    file={file}
    likeCount={likeCount}
    commentCount={commentCount}
    >
      </SquareVideo>

      </Link>
      )
  } else {
    console.log(post)
    return(
      <StyledLink to={`/challengepost?${post.id}`}
      color={files[1].url}
      >
      <Container
        style={{backgroundColor:files[0].url}}>
      <TextIcon 
        position="absolute"
        right = "0"
        width = "20%"
        height = "20%"
        />
        <TextBox 
        >{post.textContent[0]}</TextBox>
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
    </Container>
          </StyledLink>
    )
  }
}

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired
};

export default SquarePost;
