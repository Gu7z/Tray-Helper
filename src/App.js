import React from "react";
import { Button } from "./components/atoms";
import { NavBar } from "./components/molecules ";
import FloatingButton from "./components/atoms/floatingButton";
import { Close } from "@material-ui/icons";

function App() {
  return (
    <div style={{ backgroundColor: "#737373", height: window.innerHeight }}>
      <NavBar bkgColor="#262626">
        <Button color={"#D9D9D9"}>Form</Button>
        <Button color={"#D9D9D9"}>Buttons</Button>
      </NavBar>
      <FloatingButton>
        <Close />
      </FloatingButton>
    </div>
  );
}

export default App;
