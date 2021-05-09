import React from "react";
import "./Sidebar.scss";

import { SidebarData } from "./SidebarData";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import TabPage from "../pages/TabPage";
import Charts from "../pages/Charts";
import About from "../pages/About";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Sidebar = () => {
  return (
    <>
      <div className={"Sidebar"}>
        <ul className={"Sidebar__list"}>
          <li className={"Sidebar__listHeader"}>
            <div className={"Sidebar__listIcon"}>
              <AccountCircleIcon />
            </div>
            <div className={"Sidebar__listTitle"}>Mr. G</div>
          </li>
          {SidebarData.map((val, key) => {
            return (
              <li
                className={"Sidebar__listRow"}
                key={key}
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div className={"Sidebar__listIcon"}>{val.icon}</div>
                <div className={"Sidebar__listTitle"}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tabs">
          <TabPage />
        </Route>
        <Route path="/charts">
          <Charts />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </>
  );
};
export default Sidebar;
