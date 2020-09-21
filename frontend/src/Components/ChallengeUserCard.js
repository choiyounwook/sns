import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { Divider, Statistic } from 'semantic-ui-react';
const CFatText = styled(FatText)`
  color:#999999;
  font-size: small;
`;
const UFatText = styled(FatText)`
  font-size: medium;
`;
const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  padding: 10px;
  width:100%;
  max-width: 700px;
  margin:10px auto;
`;

const EAvatar = styled(Avatar)`
  margin-right: 10px;
  margin-left: 10px;
`;

const ELink = styled(Link)`
color: inherit;
margin-bottom: 5px;
text-align: center;
&:hover {
  color: ${(props) => props.theme.livingCoral};
}
`;

const Temp = styled.p`
  margin: 5px 10px;
`

const ChallengeUserCard  = ({ id, username, isFollowing, url, isSelf,nickname }) => (
  <Card>
    <EAvatar url={url} size={"sm"} />
  
    <ELink to={`/challengepost?${id}`}>
      <UFatText text={nickname}/>
      <br/>
      <CFatText text={`@${username}`}/>
    </ELink>

    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

ChallengeUserCard .propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default ChallengeUserCard ;
