import React from 'react';
import { Button as MUIButton } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D7D7D9',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#FFF',
        borderRadius: 'none',
        backgroundColor: '#88898c',
        '&:hover': {
          backgroundColor: '#404040',
        },
      },
    },
  },
});

function Button({ children, component, onClick, ...props }) {
  return (
    <MuiThemeProvider theme={theme}>
      <MUIButton onClick={onClick} component={component} variant="outlined" {...props}>
        {children}
      </MUIButton>
    </MuiThemeProvider>
  );
}

export default Button;
