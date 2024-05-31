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
  const [isGameDone, setGameDone] = useState(false);
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

    if (NUM_OF_GUESSES_ALLOWED === nextCurrentGuessAmount) {
      setGameDone(true);
    }

    if (validationResult.every((letter) => letter.status === "correct")) {
      setGameDone(true);
      setHasWon(true);
    }
  }

  return (
    <>
      <UserGuesses guesses={guesses} currentGuess={currentGuess} />
      <GameInput newGuess={newGuess} isGameDone={isGameDone} />
      {isGameDone && (
        <Banner
          currentGuessAmount={currentGuess}
          hasWon={hasWon}
          answer={answer}
        />
      )}
    </>
  );
}

export default Game;
