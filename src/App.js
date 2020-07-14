import React, { useState } from "react";
import { Button } from "./components/atoms";
import { NavBar } from "./components/molecules ";
import FloatingButton from "./components/atoms/floatingButton";
import { Close } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Form, List } from "./components/organisms";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const closeWindow = () => {
    window.ipcRenderer.send("killWindow");
    console.log(window.ipcRenderer);
  };

  return (
    <div style={{ height: window.innerHeight, backgroundColor: "#0D0D0D" }}>
      <NavBar bkgColor="#88898c">
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
      </NavBar>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <Box
                display="flex"
                mt="48px"
                alignItems="center"
                justifyContent="center"
                width={1}
              >
                <Form {...props.location.state} />
              </Box>
              <FloatingButton
                onClick={() => {
                  closeWindow();
                }}
              >
                <Close />
              </FloatingButton>
            </>
          )}
        ></Route>
        <Route path="/buttons">
          <List />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
