import { useState } from 'react';
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}

const WIN = {
  WIN: 'Ganador',
  LOSE: 'Perdedor',
  EMPATE: null
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

]
const Square = ({children, isSelected, updateBoard, index}: any) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(WIN.EMPATE);


  const checkWinner = (boardToCheck: any) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && // 0 -> X
        boardToCheck[a] == boardToCheck[b]  && // 0 y 3 _> x -> x
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a];
      }
    }

    return null
  }

  const updateBoard = (index:number) => {

    // no se actualiza si no tiene algo 

    if (board[index] || winner) return

    //Update board
    const newBoard = [...board];
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner); // el render de react es asincrono
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
              >
              {board[index]}
              </Square>
            )
        })}
      </section>
      <div className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </div>
    </main>
  )
}

export default App
