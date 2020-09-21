import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import NotiCard1 from "../../Components/NotiCard1";
import NotiCard2 from "../../Components/NotiCard2";
import FatText from "../../Components/FatText";
import {
  PanelBar,
  PanelBarUtils,
  PanelBarItem,
} from "@progress/kendo-react-layout";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EFatText = styled(FatText)`
line-height:500px;
align-items: center;
`;

export default ({ loading, data}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.seeUser) {
   return (
      <Wrapper>
        <PanelBar expandMode={"multiple"} style={{maxWidth:"600px"},{width:"95%"}}>
          <PanelBarItem title={"지목 받은 챌린지"} expanded={true}>
            {data.seeUser.relChallenger.map((relChallenger, idx) => (
              <NotiCard1 
              key={relChallenger.id}
              id={relChallenger.id}
              nickname={relChallenger.user.nickname}
              username={relChallenger.user.username}
              url={relChallenger.user.avatar}/>
             
            ))}
          </PanelBarItem>
          <PanelBarItem title={"같이 참여한 챌린지"} expanded={true}>
            {data.seeUser.tagChallenger.map((tagChallenger, idx) => (
               <NotiCard2
               key={tagChallenger.id}
               id={tagChallenger.id}
               nickname={tagChallenger.user.nickname}
               username={tagChallenger.user.username}
               url={tagChallenger.user.avatar}/>
            ))}
          </PanelBarItem>
        </PanelBar>
      </Wrapper>
    );
  }else{
    return (
      <Wrapper>
        <EFatText text="알림 불러오기 실패! 새로고침을 눌러 주세요." />
      </Wrapper>
    );
  }
};
