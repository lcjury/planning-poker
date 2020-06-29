import React from "react";
import { GameBoard } from "../GameBoard";
import { PlayerHand } from "../PlayerHand";

import { firestore } from "firebase/app";
import { useParams } from "react-router-dom";

export const Game = ({ player }) => {
  const { sessionId } = useParams();
  //Implementar algo que busque que el session ID exista, si no, 404 ?
  const [gameStatus, setGameStatus] = React.useState({
    players: {},
    revealCards: false,
  });

  React.useEffect(() => {
    const doc = firestore().collection("planning").doc(sessionId);
    return doc.onSnapshot((snapshot) => {
      setGameStatus(snapshot.data());
    });
  }, [sessionId]);

  const setRevealCards = React.useCallback(
    (status) => {
      const doc = firestore().collection("planning").doc(sessionId);

      doc.update({ revealCards: status });
    },
    [sessionId]
  );

  const setCurrentPlayerCard = React.useCallback(
    (card) => {
      const doc = firestore().collection("planning").doc(sessionId);

      const playerScore = {};
      playerScore[`players.${player}`] = card;

      doc.update(playerScore);
    },
    [sessionId, player]
  );

  const resetGame = React.useCallback(() => {
    const doc = firestore().collection("planning").doc(sessionId);

    const newPlayers = Object.assign({}, gameStatus.players);
    Object.keys(gameStatus.players).forEach(
      (player) => (newPlayers[player] = "")
    );

    doc.update({ players: newPlayers, revealCards: false });
  }, [sessionId, gameStatus]);

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex flex-1 items-center justify-around flex-col-reverse sm:flex-row p-8">
        <div className="w-full sm:w-1/2 grid-rows-2 grid grid-flow-col gap-4">
          <GameBoard
            cards={gameStatus.players}
            revealCards={gameStatus.revealCards}
          />
        </div>
        <div className="w-full sm:w-1/3 flex flex-col">
          <span>Player: {player || "Observador"}</span>

          <button
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.host}/session/join/${sessionId}`
              )
            }
          >
            Invitar
          </button>
          {!gameStatus.revealCards ? (
            <button
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() => {
                setRevealCards(true);
              }}
            >
              Revelar cartas
            </button>
          ) : (
            <button
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                resetGame();
              }}
            >
              Reiniciar partida
            </button>
          )}
        </div>
      </div>

      {player && (
        <PlayerHand
          setCard={setCurrentPlayerCard}
          card={gameStatus.players[player]}
          availableValues={[1, 2, 4, 6, 8]}
        />
      )}
    </div>
  );
};
