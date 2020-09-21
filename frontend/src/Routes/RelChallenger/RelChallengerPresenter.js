import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { withRouter,Link } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

export default withRouter(({ nickname, loading, data, history, fetchMore }) => {
  var hasMore1 = true;
  var selctedUser = null;
  const onSelectUser = (e, {value}) => {
    e.preventDefault();
    selctedUser = value;
    console.log(`${selctedUser}`);
  };
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.followingUser) {
    const userOptions = data.followingUser.map((user, idx) => ({
      key: idx,
      value: user.username,
      text: `${user.username}(@${user.nickname})`,
    }));
    return (
      <Wrapper>
        <Section>
        <Dropdown
          placeholder='현재 선택된 사용자가 없습니다'
          fluid
          multiple
          search
          selection
          options={userOptions}
          onChange={onSelectUser}
        />
        </Section>
      </Wrapper>
    );
  }
});


