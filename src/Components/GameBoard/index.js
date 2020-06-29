import React from "react";
import { Card } from "../Card";

function cardStatus(revealCards, card) {
  if (card === "") {
    return "card-unchosen";
  }
  if (revealCards) {
    return "show";
  }
  return "card-reversed";
}

export const GameBoard = ({ cards, revealCards }) => (
  <>
    {Object.keys(cards)
      .sort()
      .map((player) => (
        <div className="text-center flex flex-col items-center" key={player}>
          <Card key={player} className={cardStatus(revealCards, cards[player])}>
            {cards[player]}
          </Card>
          {player}
        </div>
      ))}
  </>
);
