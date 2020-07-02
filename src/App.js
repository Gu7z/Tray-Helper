import React from "react";
import { Button } from "./components/atoms";
import { NavBar } from "./components/molecules ";
import FloatingButton from "./components/atoms/floatingButton";
import { Close } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { Form } from "./components/organisms";

function App() {
  return (
    <div style={{ backgroundColor: "#404040", height: window.innerHeight }}>
      <NavBar bkgColor="#262626">
        <Button color={"#D9D9D9"}>Form</Button>
        <Button color={"#D9D9D9"}>Buttons</Button>
      </NavBar>
      <Box
        display="flex"
        mt="64px"
        alignItems="center"
        justifyContent="center"
        width={1}
      >
        <Form />
      </Box>
      <FloatingButton>
        <Close />
      </FloatingButton>
    </div>
  );
}

export default App;
