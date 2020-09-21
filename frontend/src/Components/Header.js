import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {
  HeartEmpty,
  User,
  Logo,
  Home,
  TextLogo,
  Search,
  MobileTextLogo,
  VideoIcon,
  PhotoIcon,
  AudioIcon,
  TextIcon,
} from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import {
  Button,
  Checkbox,
  Grid,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { Switch } from "@progress/kendo-react-inputs";

const Wrapper = styled.div`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color:white;
  // opacity: 0;
  // border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Header = styled.header`
  width: 100%;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    display: none;
  }
`;

const MobileHeader = styled.header`
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    display: none;
  }
`;

const HeaderWrapper = styled.div`
  margin: auto 10px;
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  min-width: 400px;
  margin:auto;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const TextLogoColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const Hover = styled.div`
  &:hover {
    fill: ${(props) => props.theme.livingCoral};
  }
`;

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_ANIMATION":
      return { ...state, animation: action.animation, visible: !state.visible };
    case "CHANGE_DIMMED":
      return { ...state, dimmed: action.dimmed };
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction, visible: false };
    default:
      throw new Error();
  }
}

export default withRouter(() => {
  const { data } = useQuery(ME);
  // const items = [
  //   { text: "Video", icon: ".k-i-video-external", selected: true },
  //   { text: "Image", icon: ".k-i-image-edit" },
  //   { text: "Audio", icon: "k-i-calendar" },
  //   { text: "Text", icon: "k-i-hyperlink-email" },
  // ];
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: "overlay",
    direction: "right",
    visible: false,
  });

  const { animation, direction, visible } = state;
  const vertical = direction === "right";

  return (
    <Wrapper>
      <Header>
        <Sidebar
          as={Menu}
          animation={animation}
          direction={direction}
          icon="labeled"
          inverted
          vertical
          visible={visible}
          width="100px"
          style={{
            backgroundColor: `white`,
          }}
          onClick={() =>
            dispatch({ type: "CHANGE_ANIMATION", animation: "overlay" })
          }
        >
          <Menu.Item
            as={Link}
            to="/createvideopost"
            style={{
              borderBottom: `2px solid #FAFAFA`,
            }}
          >
            <Hover>
              <VideoIcon
                width="50"
                height="50"
                // color="white"
              />
            </Hover>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/createphotopost"
            style={{
              borderBottom: `2px solid #FAFAFA`,
            }}
          >
            <Hover>
              <PhotoIcon
                width="50"
                height="50"
                // color="white"
              />
            </Hover>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/createaudiopost"
            style={{
              borderBottom: `2px solid #FAFAFA`,
            }}
          >
            <Hover>
              <AudioIcon
                width="50"
                height="50"
                // color="white"
              />
            </Hover>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/createtextpost"
            style={{
              borderBottom: `2px solid #FAFAFA`,
            }}
          >
            <Hover>
              <TextIcon
                width="50"
                height="50"
                // color="white"
              />
            </Hover>
          </Menu.Item>
        </Sidebar>

        <HeaderWrapper>
          <TextLogoColumn>
            <Link to="/" replace>
              <TextLogo width="200" height="50"/>
            </Link>
          </TextLogoColumn>
          <HeaderColumn>
            {/* <HeaderLink to="/#" replace> */}
            <div               style = {{
                marginRight:"30px",
                display:"inline-block"
              }}>

            <Logo
              width="27"
              height="27"
              onClick={() =>
                dispatch({ type: "CHANGE_ANIMATION", animation: "overlay" })
              }
            />
              </div>
            {/* </HeaderLink> */}

            <HeaderLink to="/search" replace>
              <Search width="27" height="27" 
                            style = {{
                              marginLeft:"30px",
                            }}/>
            </HeaderLink>
            <HeaderLink to="/notifications" replace>
              <HeartEmpty width="27" height="27" />
            </HeaderLink>
            {!data.me ? (
              <HeaderLink to="/#" replace>
                <User width="27" height="27" />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.me.username} replace>
                <User width="27" height="27" />
              </HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
      <MobileHeader>
        <MobileTextLogo />
      </MobileHeader>
    </Wrapper>
  );
});
