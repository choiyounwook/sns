import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing:border-box;
    }
    body {
        // background-color:rgba(205,209,255,0.3);
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 55px;
        @media only screen and (max-width:${(props) => props.theme.sm}) {       
            padding-top: 60px;
        }
    }
    a {
        color:${(props) => props.theme.livingCoral};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }

    .now {
        fill: ${(props) => props.theme.livingCoral};
    }

    .dropOpen {
        color: ${(props) => props.theme.livingCoral}
        fill: ${(props) => props.theme.livingCoral}
    }

    .mobileTextLogo {
        fill: ${(props) => props.theme.livingCoral};
        // opacity: 0.7;
    }
`;
