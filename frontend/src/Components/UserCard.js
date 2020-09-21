import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const CFatText = styled(FatText)`
  color:#999999;
`;
const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width:100%;
  max-width: 700px;
  margin:10px auto;
  justify-content:space-between;
`;

const EAvatar = styled(Avatar)`
  margin-right: 10px;
  margin-left:10px;

`;

const ELink = styled(Link)`
  color: inherit;
  margin: 5px 10px;
`;

const Temp = styled.p`
  margin: 5px 10px;
`

const UserCard = ({ id, username, isFollowing, url, isSelf,nickname }) => (
  <Card>
    <EAvatar url={url} size={"sm"} />
  
      <ELink to={`/${username}`}>
        <FatText text={nickname} />
        <CFatText text={` (@${username})`}/>
      </ELink>

    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
    {isSelf && <Temp />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;
