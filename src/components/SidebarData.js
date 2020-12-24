import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import TableChartIcon from "@material-ui/icons/TableChart";
import InfoIcon from "@material-ui/icons/Info";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Tabs",
    icon: <TableChartIcon />,
    link: "/tabs",
  },
  {
    title: "Reports",
    icon: <TimelineIcon />,
    link: "/reports",
  },
  {
    title: "About",
    icon: <InfoIcon />,
    link: "/about",
  },
];
