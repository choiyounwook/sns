import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { Popup} from 'semantic-ui-react'

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
`;
const EFatText = styled(FatText)`
  color:#999999;
  font-weight: 600;
  font-size: 70%;
`;

const Temp = styled.div`
height :20px;
margin-bottom:30px;
`

const NewUserCard = ({ id, username, isFollowing, url, isSelf, nickname,bio }) => (
  <Popup
  trigger={
      <Card>
        <EAvatar url={url} size={"md"} />
        <ELink to={`/${username}`}>
        <FatText text={nickname} />
        </ELink>
        <ELink to={`/${username}`}>
        <EFatText text={`@${username}`} />
        </ELink>
        {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
        {isSelf && <Temp />}
      </Card>}
    >
      <Popup.Header>한 마디</Popup.Header>
      <Popup.Content>{bio}</Popup.Content>
  </Popup>
);

NewUserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default NewUserCard;