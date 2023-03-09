import { useState } from "react";
import { Square } from "./components/Square.jsx";
import conffeti from "canvas-confetti";
import { TURNS } from "./constantes";
import { checkEndGame, checkWinner } from "./logic/board.js";

import { WinnerModal } from "./components/WinnerModal.js";
import { Board } from "./components/Board.js";
import { resetGameStorage, saveGameToStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(
    () => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X
    }
  );
  const [winner, setWinner] = useState<boolean | null>(null);

  const updateBoard = (index: number) => {
    // no se actualiza si no tiene algo
    if (board[index] || winner) return;
    //Update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    
    //Checkear winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      conffeti();
      setWinner(newWinner); // el render de react es asincrono
      console.log(winner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage()
  };

  return (
    <main className="board">
      <h1>Tic Tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <Board board={board} updateBoard={updateBoard} />
      <div className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </div>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
