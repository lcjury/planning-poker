import React from "react";
import { firestore } from "firebase/app";
import { useHistory } from "react-router-dom";

export const NewSession = ({ onStartGame }) => {
  const [, setSessionName] = React.useState();
  const [playerName, setPlayerName] = React.useState();
  let history = useHistory();

  const createSession = React.useCallback(() => {
    let playersCards = {};
    playersCards[playerName] = "";

    const db = firestore();
    const newSession = db.collection("planning").add({
      players: playersCards,
      revealCards: false,
    });

    newSession.then((c) => {
      onStartGame(c.id, playerName);
      history.push("/" + c.id);
    });

    //TODO: Deshabilitar el boton mientras esto ocurre
  }, [onStartGame, playerName, history]);

  return (
    <div className="mx-auto flex justify-center items-center w-1/3">
      <div className="border-teal-500 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg text-center">
        <h1 className="font-hairline mb-6 text-center">
          Crear una nueva sesión
        </h1>
        <div className="mb-4">
          <input
            type="text"
            className="block appearance-none w-full bg-white border border-grey-100 hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Nombre de la sesión"
            onChange={(name) => setSessionName(name.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="block appearance-none w-full bg-white border border-grey-100 hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Tú nombre"
            onChange={(name) => setPlayerName(name.target.value)}
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => createSession()}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
          >
            Crear Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
