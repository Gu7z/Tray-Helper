import React from "react";
import { Box } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D7D7D9",
    },
  },
});

function NavBar({ bkgColor, children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Box
        width={1}
        bgcolor={bkgColor}
        height={64}
        display="flex"
        flexDirection="row"
        justifyContent="space-round"
        alignItems="center"
      >
        {children}
      </Box>
    </MuiThemeProvider>
  );
}

export default NavBar;
