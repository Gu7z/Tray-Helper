import React from "react";
import { Button } from "./components/atoms";
import { NavBar } from "./components/molecules ";
import FloatingButton from "./components/atoms/floatingButton";
import { Close } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Form } from "./components/organisms";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const closeWindow = () => {
    window.ipcRenderer.send("killWindow");
    console.log(window.ipcRenderer);
  };

  return (
    <div style={{ height: window.innerHeight, backgroundColor: "#0D0D0D" }}>
      <NavBar bkgColor="#FF8C00">
        <Button
          style={{ width: "100%", height: "100%" }}
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
        <Route path="/" exact>
          <Box
            display="flex"
            mt="48px"
            alignItems="center"
            justifyContent="center"
            width={1}
          >
            <Form />
          </Box>
          <FloatingButton
            onClick={() => {
              closeWindow();
            }}
          >
            <Close />
          </FloatingButton>
        </Route>
        <Route path="/buttons">
          <div>Alo</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
