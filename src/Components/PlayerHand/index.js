import React from "react";
import { Card } from "../Card";

function isSelected(card, number) {
  return card === number ? "card-selected" : "";
}

/**
 * Returns empty string if we need to toggle the current active card
 */
function selectCardValue(clickedCard, currentCard) {
  if (clickedCard === currentCard) {
    return "";
  }
  return clickedCard;
}

export const PlayerHand = ({
  setCard,
  card,
  availableValues = [2, 4, 6, 8],
}) => (
  <div className="bg-teal-600">
    <div className="flex justify-evenly relative -top-16">
      {availableValues.map((value) => (
        <Card
          key={value}
          className={isSelected(card, value)}
          onClick={() => setCard(selectCardValue(value, card))}
        >
          {value}
        </Card>
      ))}
    </div>
  </div>
);
