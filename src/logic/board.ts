import { WINNER_COMBOS } from "../constantes";

export const checkWinner = (boardToCheck: any) => {
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

export const checkEndGame = (newBoard: any) => {
    return newBoard.every((square:any) => square != null)
  }