import { Square } from "./Square"

export const Board = ({board, updateBoard}: any) => {
  return (
    
    <section className="game">
    {
      board.map((square: string, index: number) => {
        return (
          <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
          >
          {square}
          </Square>
        )
    })}
  </section>
  )
}
