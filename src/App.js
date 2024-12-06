import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("")));
  const [clickSequence, setClickSequence] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

  const handleClick = (row, col) => {
    if (matrix[row][col] || isGameOver) return; // Ignore clicks on already clicked boxes or after game ends

    const newMatrix = matrix.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? "green" : cell))
    );

    setMatrix(newMatrix);
    setClickSequence([...clickSequence, { row, col }]);
    setClickCount(clickCount + 1);

    if (row === 2 && col === 2) {
      handleLastBoxClick([...clickSequence, { row, col }]);
    }
  };

  const handleLastBoxClick = (sequence) => {
    let index = 0;
    setIsGameOver(true); // Prevent further clicks
    const interval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(interval);
        return;
      }

      const { row, col } = sequence[index];
      setMatrix((prevMatrix) =>
        prevMatrix.map((r, i) =>
          r.map((cell, j) => (i === row && j === col ? "orange" : cell))
        )
      );

      index++;
    }, 500);
  };

  const restartGame = () => {
    setMatrix(Array(3).fill(Array(3).fill("")));
    setClickSequence([]);
    setClickCount(0);
    setIsGameOver(false); // Allow clicks again
  };

  return (
    <div className="container">
      <h1>Interactive 3x3 Matrix</h1>
      <p>
        Click on any box to change its color to green. When you click on the last box (bottom-right), all boxes will turn orange in the order of your clicks! After all boxes turn orange, you can restart.
      </p>
      <h2>Click Count: {clickCount}</h2>
      <div className="grid">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`box ${cell}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell === "green" || cell === "orange" ? (
                <span className="emoji">{cell === "green" ? "✅" : "🔥"}</span>
              ) : null}
            </div>
          ))
        )}
      </div>
      {isGameOver && (
        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
