import React, { useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import GameInput from "../GameInput/GameInput";
import UserGuesses from "../UserGuesses/UserGuesses";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Banner from "../Banner/Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  function newGuess(guess) {
    if (NUM_OF_GUESSES_ALLOWED === currentGuess) {
      return;
    }

    const validationResult = checkGuess(guess, answer);

    const guessObject = {
      id: crypto.randomUUID(),
      validationResult,
    };
    const nextGueses = [...guesses, guessObject];
    setGuesses(nextGueses);

    const nextCurrentGuessAmount = currentGuess + 1;
    setCurrentGuess(nextCurrentGuessAmount);

    if (validationResult.every((letter) => letter.status === "correct")) {
      console.log("yeaaa");
      setHasWon(true);
    } else {
      console.log(NUM_OF_GUESSES_ALLOWED === currentGuess + 1);
    }
  }

  return (
    <>
      <UserGuesses guesses={guesses} currentGuess={currentGuess} />
      <GameInput newGuess={newGuess} />
      {NUM_OF_GUESSES_ALLOWED === currentGuess ||
        (hasWon && <Banner currentGuess={currentGuess} hasWon={hasWon} />)}
    </>
  );
}

export default Game;
