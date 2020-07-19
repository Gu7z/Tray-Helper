import React from "react";
import { FloatingButton } from "../atoms";
import { NavBar } from "../molecules ";
import { List } from "../organisms";
import { Close } from "@material-ui/icons";
import { closeWindow } from "../../utils";

const CommandsList = () => {
  return (
    <>
      <NavBar />
      <List />
      <FloatingButton onClick={closeWindow}>
        <Close />
      </FloatingButton>
    </>
  );
};

export default CommandsList;
