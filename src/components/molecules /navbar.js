import React from "react";
import styled from "styled-components";

const StyledNavBar = styled.div`
  width: 100%;
  background-color: ${({ props }) => {
    return props.bkgColor;
  }};
  height: 64px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

function NavBar({ bkgColor, children }) {
  return <StyledNavBar props={{ bkgColor }}> {children} </StyledNavBar>;
}

export default NavBar;
