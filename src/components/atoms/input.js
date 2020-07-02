import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const StyledInput = styled(TextField)`
  background-color: #737373;
  border-radius: 5px;

  && .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #d9d9d9;
  }

  && .MuiFormLabel-root.Mui-focused {
    color: #d9d9d9;
  }
`;

function Input({ label, variant }) {
  return <StyledInput label={label} variant={variant}></StyledInput>;
}

export default Input;
