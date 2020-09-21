import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import SquarePost from "./SquarePost";
import { isNullableType } from "graphql";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  padding: 10px;
  width:95%;
  max-width: 700px;
  margin:10px auto;
`;

const ELink = styled(Link)`
  color: inherit;
  margin: 5px 10px;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  max-width: 610px;
    margin: 15px auto;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    justify-content: space-around;
  }
`;
const HashtagCard = ({ id, username,postCount,posts}) => (
  <div>
  <Card> 
      <ELink to={`/challenge?`+encodeURIComponent(username)}>
        <FatText text={username} />
      </ELink>
      <FatText text={`UPLOAD ${postCount}`} />
  </Card>
  <Posts>
  {posts &&
    posts.map((post) => {
      return(
        <SquarePost
          key={post.id}
          id={post.id}
          likeCount={post.likeCount}
          commentCount={post.comments.length}
          file={post.files[0]}
          file1={post.files[1]}
          files = {post.files}
          post={post}
        />
      )
    })}
</Posts>
</div>
);

export default HashtagCard;
