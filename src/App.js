import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./Pages/Login";
import { JoinSession } from "./Pages/JoinSession";
import { Game } from "./Components/Game";
import { NewSession } from "./Components/NewSession";

function App() {
  const [, setGameId] = React.useState();
  const [playerName, setPlayerName] = React.useState();

  const onStartGame = React.useCallback(
    (sessionId, playerName) => {
      setGameId(sessionId);
      setPlayerName(playerName);
    },
    [setGameId, setPlayerName]
  );

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Router>
        <Switch>
          <Route path="/session/join/:sessionId">
            <JoinSession onStartGame={onStartGame}></JoinSession>
          </Route>
          <Route path="/session/new">
            <NewSession onStartGame={onStartGame} />
          </Route>
          <Route path="/:sessionId" exact>
            <Game player={playerName}></Game>
          </Route>
          <Route path="/" exact>
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
