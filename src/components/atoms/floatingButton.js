import React from "react";
import { Button as MUIButton } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(MUIButton)`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 24px;
  height: 64px;
  border-radius: 50%;
  background-color: #262626;
  :hover {
    background-color: #404040;
  }
`;

function FloatingButton({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

export default FloatingButton;
