import { AppBar, Toolbar } from "@mui/material";
// AppBar: https://mui.com/material-ui/react-app-bar/
// ToolBar: https://mui.com/material-ui/api/toolbar/
// sx: https://mui.com/system/getting-started/the-sx-prop/

import React from "react";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}></Toolbar>
    </AppBar>
  );
};

export default Header;
