import { AppBar, Toolbar } from "@mui/material";
// AppBar: https://mui.com/material-ui/react-app-bar/
// ToolBar: https://mui.com/material-ui/api/toolbar/
// sx: https://mui.com/system/getting-started/the-sx-prop/

import React from "react";
import Logo from "./shared/Logo";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
