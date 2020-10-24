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
import UserList from "./pages/user-list/UserList";

import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const showMenu = () => setMobileMenu(true);
  const hideMenu = () => setMobileMenu(false);

  return (
    <Router>
      <div className="app">
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
            {user ? <UserProfile /> : <Redirect to="/" />}
          </Route>
          <Route path="/user/:username/:list" exact strict>
            {user ? <UserList /> : <Redirect to="/" />}
          </Route>
          <Route path="/:type/:title" strict exact component={FilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
