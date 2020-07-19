import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CreateCommand, CommandsList } from "./components/pages";

function App() {
  const history = useHistory();

  useEffect(() => {
    if (history) {
      history.push("/");
    }
  }, [history]);

  return (
    <div style={{ height: window.innerHeight, backgroundColor: "#0D0D0D" }}>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <CreateCommand {...props} />}
        />
        <Route path="/buttons">
          <CommandsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
