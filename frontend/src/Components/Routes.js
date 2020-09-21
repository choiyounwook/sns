import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import SearchUser from "../Routes/SearchUser";
import SearchHashtag from "../Routes/SearchHashtag";
import Profile from "../Routes/Profile";
import Following from "../Routes/Following";
import Follower from "../Routes/Follower";
import Notification from "../Routes/Notification";
import ChangePasswd from "../Routes/ChangePasswd";
import SetScope from "../Routes/SetScope";
import SetCategory from "../Routes/SetCategory";
import DeleteAccount from "../Routes/DeleteAccount";
import SelectPhoto from "../Routes/SelectPhoto";
import CreatePost from "../Routes/CreatePost";
import findPasswd from "../Routes/findPasswd";
import HashtagPage from "../Routes/HashtagPage";
import CreateVideoPost from "../Routes/CreateVideoPost";
import CreatePhotoPost from "../Routes/CreatePhotoPost";
import CreateAudioPost from "../Routes/CreateAudioPost";
import CreateTextPost from "../Routes/CreateTextPost";
import Challenge from "../Routes/Challenge";
import Temp from "../Routes/temp";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/search" component={Search} />
    <Route path="/following" component={Following} />
    <Route path="/follower" component={Follower} />
    <Route path="/search-user" component={SearchUser} />
    <Route path="/search-challenge" component={SearchHashtag} />
    <Route path="/notifications" component={Notification} />
    <Route path="/findpasswd" component={findPasswd} />
    <Route path="/setpasswd" component={ChangePasswd} />
    <Route path="/setscope" component={SetScope} />
    <Route path="/setcategory" component={SetCategory} />
    <Route path="/deleteacc" component={DeleteAccount} />
    <Route path="/selectphoto" component={SelectPhoto} />
    <Route path="/createpost" component={CreatePost} />
    <Route path="/challenge" component={HashtagPage} />
    <Route path="/challengepost" component={Challenge} />
    <Route path="/createvideopost" component={CreateVideoPost} />
    <Route path="/createphotopost" component={CreatePhotoPost} />
    <Route path="/createaudiopost" component={CreateAudioPost} />
    <Route path="/createtextpost" component={CreateTextPost} />
    <Route path="/temp" component={Temp} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
