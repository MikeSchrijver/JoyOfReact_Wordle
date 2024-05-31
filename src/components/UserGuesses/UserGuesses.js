import React from "react";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function UserGuesses({ guesses, currentGuess }) {
  const maxEmptyRows = NUM_OF_GUESSES_ALLOWED - currentGuess;

  return (
    <div className="guess-results">
      {guesses.map((item) => (
        <p key={item.id} className="guess">
          {item.validationResult.map((resultChar) => (
            <span key={Math.random()} className={`cell ${resultChar.status}`}>
              {resultChar.letter}
            </span>
          ))}
        </p>
      ))}
      {range(0, maxEmptyRows).map((y) => (
        <p key={y} className="guess">
          {range(0, 5).map((x) => (
            <span key={x} className="cell"></span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default UserGuesses;
