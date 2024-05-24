import React from "react";

function Banner({ currentGuessAmount, hasWon }) {
  return (
    <>
      {hasWon ? (
        <div class="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>{currentGuessAmount} guesses</strong>.
          </p>
        </div>
      ) : (
        <div class="sad banner">
          <p>
            Sorry, the correct answer is <strong>LEARN</strong>.
          </p>
        </div>
      )}
    </>
  );
}

export default Banner;
