import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { UserContext } from "./hooks/userContext";
import Header from "./components/header/Header";
import MobileMenu from "./components/mobile-menu/MobileMenu";
import SectionsHandler from "./containers/main-sections/SectionsHandler";
import MyListsContainer from "./containers/my-lists-container/MyListsContainer";
import TrendingSectionHandler from "./containers/trending-sections/TrendingSectionHandler";
import LastNewsContainer from "./containers/news-container/LastNewsContainer";
import UploadPage from "./pages/upload-page/UploadPage";
import LoginPage from "./pages/login-page/LoginPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import FilePage from "./pages/file-page/FilePage";
import UserProfile from "./pages/user-profile/UserProfile";
import {UserList} from "./components/user-list/UserList";
import Alert from "./Alert";

import "./App.css";
import Loading from "./components/loading/Loading";

function App() {
  const { user, loading } = useContext(UserContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const showMenu = () => setMobileMenu(true);
  const hideMenu = () => setMobileMenu(false);

  if(loading) {
    return (
      <div className="app">
        <Loading />
      </div>
    )
  }
  return (
    <Router>
      <div className="app">
        <Alert />
        <Header showMenu={showMenu} />
        {mobileMenu && <MobileMenu hideMenu={hideMenu} />}
        <Route path="/" exact component={SectionsHandler} />
        <Route path="/" exact component={MyListsContainer} />
        <Route path="/" exact component={TrendingSectionHandler} />
        <Route path="/" exact component={LastNewsContainer} />
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/upload" exact>
            {user.username ? <UploadPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/user/:username" exact strict>
            {user.username ? <UserProfile /> : <Redirect to="/" />}
          </Route>
          <Route path="/user/:username/:list" exact strict>
            {user.username ? <UserList /> : <Redirect to="/" />}
          </Route>
          <Route path="/:type/:title" strict exact component={FilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
