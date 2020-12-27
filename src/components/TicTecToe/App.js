import React, { useState } from "react";
import styled from "styled-components";

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`

const Status = styled.div`
  margin-bottom: 10px;
`

const SquareButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;

  &:focus {
    outline: none;
  }
`

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
`

const GameInfo = styled.div`
  margin-left: 20px;
`

const GameBoard = styled.div`
`


const Square = (props) => {
  return (
    <SquareButton onClick={() => props.onClick()} >
     {props.value}
    </SquareButton>
  )
}


const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  
  // const handleClick = (i) => {
  //   const current = history[history.length - 1]
  //   const newBoard = current.board
  //   if (caculateWinner(newBoard) || newBoard[i]) {
  //     return 
  //   }
  //   newBoard[i] = xIsNext ? 'X' : 'O'
  //   setBoard(newBoard)
  //   setXIsNext(!xIsNext)
  // }

  const handleClick = (i) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    if (caculateWinner(board) || board[i]) {
      return 
    }
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square 
        onClick={() => handleClick(i)} 
        value={board[i]}
      />
    )
  }

  const caculateWinner = (board) => {
    const lines = [
      [0, 1, 2], 
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const winner = caculateWinner(board)
  let status
  if (winner) {
    status = 'Winner ' + winner
  } else {
    status = 'Next player:' + (xIsNext ? 'X' : 'O')
  }
 
  return (
    <div>
      <Status>{status}</Status>
      <BoardRow>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </BoardRow>
      <BoardRow>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </BoardRow>
      <BoardRow>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </BoardRow>
    </div>
  ) 
}

const Game = () => {
  // const [history, setHistory] = useState([{board}]) 
  // console.log(history)

  return (
    <StyledGame>
      <GameBoard>
        <Board />
      </GameBoard>
      <GameInfo>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </GameInfo>
    </StyledGame>
  )
}

function App() {
  return (
   <Game 
  
  />
  );
}

export default App;
