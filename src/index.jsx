import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CreateCommand, CommandsList } from './components/pages';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D7D7D9',
    },
  },
});

const Index = () => {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" render={(props) => <CreateCommand {...props} />} />
          <Route exact path="/data">
            <CommandsList />
          </Route>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
