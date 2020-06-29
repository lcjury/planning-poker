import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { firestore } from "firebase/app";

export const JoinSession = ({ onStartGame }) => {
  const { sessionId } = useParams();
  const [playerName, setPlayerName] = React.useState();
  const history = useHistory();

  const joinSession = React.useCallback(() => {
    let playerCard = {};
    playerCard[`players.${playerName}`] = "";

    const doc = firestore().collection("planning").doc(sessionId);

    doc.update(playerCard).then(() => {
      onStartGame(sessionId, playerName);
      history.push("/" + sessionId);
    });
    //TODO: Deshabilitar el boton mientras esto ocurre
  }, [sessionId, playerName, history, onStartGame]);

  return (
    <div className="mx-auto flex justify-center items-center w-1/3">
      <div className="border-teal-500 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg text-center">
        <h1 className="font-hairline mb-6 text-center">Unirte a una sesión</h1>
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
            onClick={() => joinSession()}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
          >
            Unirme a la sesión
          </button>
        </div>
      </div>
    </div>
  );
};
