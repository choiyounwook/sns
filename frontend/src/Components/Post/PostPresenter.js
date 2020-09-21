import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import {
  HeartFull,
  HeartEmpty,
  Comment as CommentIcon,
  Logo,
  VideoIcon,
  AudioIcon,
  TextIcon,
  PhotoIcon,
} from "../Icons";
import Audio from "../Audio/Audio";
import Video from "../Video/Video";
import ChallengeUserCard from "../ChallengeUserCard";
import UserCard from "../UserCard";
import Carousel from "flat-carousel";
import "../../Styles/carousel.css";
import { Header } from "semantic-ui-react";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import DropdownMenu from "../ChallengeOption";

const LikeText = styled(FatText)`
  color: ${(props) => props.theme.livingCoral};
`;

const CFatText = styled(FatText)`
  line-height: 100px;
`;
const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  user-select: none;
  margin: 3px 0;
  a {
    color: inherit;
  }
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    width: 100%;
  }
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    width: 400px;
  }
`;

const Header1 = styled.header`
  padding: 10px 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const ImageFiles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const AudioFiles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const VideoFiles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const Img = styled.div`
  width:100%;
  height: 100%;
  // @media only screen and (min-width:${(props) => props.theme.sm}) {
  //   width:760px;
  //   height: 760px;
  // }
`;

const ImageFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const TextFile = styled.div`
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    height: 400px;
  }
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    height: 100vw;
    max-height: 400px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  display: inline-block;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.livingCoral} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin: 10px 0px;
`;

const CreateButton = styled.button`
  width: 10px;
  height: 10px;
`;

const PostA = styled.a`
  margin: 5px;
  margin-left: 0px;
`;
const SDiv = styled.div`
  margin: 15px auto;
  text-align-last: center;
`;
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

const SeeChallenger = ({
  prePosts,
  nextPosts,
  nextPostCount,
  prePostCount,
}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <PostA onClick={() => dispatch({ type: "open", size: "tiny" })}>
        <FatText text={`${nextPostCount + prePostCount} Challenge`} />
      </PostA>
      <Modal
        size={size}
        open={open}
        style={{
          height: `auto`,
          position: `relative`,
        }}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
          <Header as="h3" dividing>
            이전 챌린저
          </Header>
          {prePosts.length === 0 ? (
            <SDiv>
              <CFatText text="이전 챌린저가 없습니다." />
            </SDiv>
          ) : (
            prePosts.map((post, idx) => (
              <ChallengeUserCard
                key={idx}
                username={post.user.username}
                isFollowing={post.user.isFollowing}
                url={post.user.avatar}
                isSelf={post.user.isSelf}
                id={post.id}
                bio={post.user.bio}
                nickname={post.user.nickname}
              />
            ))
          )}
          <Header as="h3" dividing>
            다음 챌린저
          </Header>
          {nextPosts.length === 0 ? (
            <SDiv>
              <CFatText text="동참한 챌린저가 없습니다." />
            </SDiv>
          ) : (
            nextPosts.map((post, idx) => (
              <ChallengeUserCard
                key={idx}
                username={post.user.username}
                isFollowing={post.user.isFollowing}
                url={post.user.avatar}
                isSelf={post.user.isSelf}
                id={post.id}
                bio={post.user.bio}
                nickname={post.user.nickname}
              />
            ))
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>Close</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
const SeeLikes = ({ likes, likeCount, isLiked }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <PostA onClick={() => dispatch({ type: "open", size: "tiny" })}>
        {isLiked ? (
          <LikeText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        ) : (
          <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        )}
      </PostA>
      <Modal
        size={size}
        open={open}
        style={{
          height: `auto`,
          position: `relative`,
        }}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
          <Header as="h3" dividing>
            좋아요
          </Header>
          {likes.length === 0 ? (
            <SDiv>
              <CFatText text="현재 좋아요가 없습니다." />
            </SDiv>
          ) : (
            likes.map((like, idx) => (
              <UserCard
                id={like.user.id}
                nickname={like.user.nickname}
                key={idx}
                username={like.user.username}
                isFollowing={like.user.isFollowing}
                url={like.user.avatar}
                isSelf={like.user.isSelf}
              />
            ))
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>Close</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  Cuser,
  category,
  id,
  hashtags,
  prePostCount,
  nextPostCount,
  prePosts,
  nextPosts,
  create,
  setCreate,
  selHashtags,
  setSelHashtags,
  pid,
  setPid,
  cat,
  setCat,
  textContent,
  likes,
  isDetail,
}) => {
  const [curCaption, setCurCaption] = useState("");
  const [curId, setCurId] = useState("");

  function setting() {
    setCat(category);
    setPid(id);
    setSelHashtags(hashtags);
    setCreate(true);
  }

  const { data } = useQuery(ME);
  return (
    <Post>
      <Header1>
        <Avatar size="sm" url={avatar} margin="0" />
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
        {username === data.me.username && isDetail && (
          <DropdownMenu pid={id} defaultCaption={caption}></DropdownMenu>
        )}
      </Header1>
      {category === "image" && (
        <Files>
          <Carousel>
            {files.map((pre, index) => (
              // <img key={index} className="demo-item" src={pre.url} />
              <Img
                key={index}
                alt={"dummy"}
                style={{
                  backgroundImage: `url(${pre.url}`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "300px",
                }}
              />
            ))}
          </Carousel>
          <PhotoIcon
            position="absolute"
            width="10%"
            height="10%"
            top="20px"
            right="20px"
          />
        </Files>
      )}
      {category === "video" && (
        <Files>
          <Video videoURL={files[0].url} videoID={id} />
          {/* <video controls width="100%">
        <source src={files[0].url} type="video/mp4"/>
       </video> */}
          {/* {files && files.map((file, index) => {
          if (file.url) {
            console.log(category)
            console.log(file.url)
            return (<VideoFile key={file.id} src={file.url} showing={index === currentItem} />)
          } else {
              return (<VideoFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
            }})} */}
          <VideoIcon
            position="absolute"
            width="10%"
            height="10%"
            top="20px"
            right="20px"
          />
        </Files>
      )}
      {category === "audio" && (
        <Files>
          <Audio audioURL={files[0].url} imgURL={files[1].url} audioID={id} />
          <AudioIcon
            position="absolute"
            width="10%"
            height="10%"
            top="20px"
            right="20px"
          />
        </Files>
      )}
      {category === "text" && (
        <Files>
          {files && (
            <TextFile
            style={{
              backgroundColor: files[0].url,
              color: files[1].url,
              fontSize: "30px",
              width:"100%",
              display: `table`
            }}
          >
            <p
            style={{
              verticalAlign: `middle`,
              display: `table-cell`,
              textAlign: `center`
            }}>
              {textContent}
            </p>
          </TextFile>
          )}
          {/* {files && files.map((file, index) => {
          if (file.url) {
            return (<TextFile key={file.id} src={file.url} showing={index === currentItem} />)
          } else {
              return (<TextFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
            }})} */}
          <TextIcon
            position="absolute"
            width="10%"
            height="10%"
            top="20px"
            right="20px"
          />
        </Files>
      )}
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? (
              <HeartFull width="24" height="24" />
            ) : (
              <HeartEmpty width="24" height="24" />
            )}
          </Button>
          <Button onClick={() => console.log("서프라이즈~~~")}>
            <CommentIcon width="24" height="24" />
          </Button>

          <Button style={{ marginLeft: "10px" }}>
            <Logo onClick={() => setting()} width="24" height="24"></Logo>
          </Button>
        </Buttons>

        <Button>
          <SeeLikes likes={likes} likeCount={likeCount} isLiked={isLiked} />
        </Button>

        <Button>
          <SeeChallenger
            prePosts={prePosts}
            nextPosts={nextPosts}
            nextPostCount={nextPostCount}
            prePostCount={prePostCount}
          />
        </Button>
        <Caption>
          {Cuser}
          <FatText text={username} /> {caption}
        </Caption>
        {comments && (
          <Comments>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
            {selfComments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
        <Timestamp>{createdAt}</Timestamp>
        <Textarea
          onKeyPress={onKeyPress}
          placeholder={"Add a comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
        />
      </Meta>
    </Post>
  );
};
