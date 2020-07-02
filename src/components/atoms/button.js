import React from "react";
import { Button as MUIButton } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(MUIButton)`
  background-color: ${({ props }) => {
    return props.bkgColor;
  }};
  width: 100%;
  height: 100%;
  color: ${({ props }) => {
    return props.color;
  }};
  font-size: 16px;
`;

function Button({ children, bkgColor, color, onClick }) {
  return (
    <StyledButton onClick={onClick} props={{ bkgColor, color }}>
      {children}
    </StyledButton>
  );
}

export default Button;
