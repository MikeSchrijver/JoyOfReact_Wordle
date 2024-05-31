import React, { useState } from "react";

function GameInput({ newGuess, isGameDone }) {
  const [guessValue, setGuessValue] = useState("");

  function validateGuess(event) {
    event.preventDefault();
    newGuess(guessValue);
    setGuessValue("");
  }

  return (
    <form className="guess-input-wrapper" onSubmit={(e) => validateGuess(e)}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guessValue}
        required
        disabled={isGameDone}
        pattern=".{5,}"
        minLength={5}
        maxLength={5}
        onChange={(e) => setGuessValue(e.target.value.toUpperCase())}
      />
    </form>
  );
}

export default GameInput;
