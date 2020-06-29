import React from "react";
/**
 * statuses: hidden | show | unchosen
 *
 */
const isHidden = (status) => (status === "hidden" ? "card-reversed" : "");
const isUnchosen = (status) => (status === "unchosen" ? "card-unchosen" : "");

export const Card = ({ onClick, className, children, status = "show" }) => (
  <div
    onClick={onClick}
    className={["card", className, isHidden(status), isUnchosen(status)].join(
      " "
    )}
  >
    {status === "hidden" ? "" : children}
  </div>
);
