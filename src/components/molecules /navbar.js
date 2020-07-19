import React from "react";
import { Box } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "../atoms";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D7D7D9",
    },
  },
});

function NavBar() {
  return (
    <MuiThemeProvider theme={theme}>
      <Box
        width={1}
        bgcolor="#88898c"
        height={56}
        display="flex"
        flexDirection="row"
        justifyContent="space-round"
        alignItems="center"
      >
        <Button
          style={{ width: "100%", height: "100%" }}
          variant="outlined"
          component={Link}
          to="/"
        >
          Form
        </Button>
        <Button
          style={{ width: "100%", height: "100%" }}
          component={Link}
          to="/buttons"
        >
          Buttons
        </Button>
      </Box>
    </MuiThemeProvider>
  );
}

export default NavBar;
