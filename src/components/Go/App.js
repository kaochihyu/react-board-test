import React, { Fragment, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import PropTypes from 'prop-types';

const GlobalStyle = createGlobalStyle`
  body {
    color: #eee;
    margin: 0;
    padding: 0;
  }
`
const Container = styled.div`
  padding: 40px;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
`

const Info = styled.div`
`

const Title = styled.div`
  font-size: 20px;
  color: #555;
  padding: 10px;
  background-color: #fff;
`
const Status = styled.div`
  color: #555;
  font-size: 20px;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
`

const Reset = styled.div`
  font-size: 16px;
  color: #fff;
  background-color: #888;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  margin-top: 10px;
  float: right;
`

const GameBoard = styled.div`
  position: relative;
  border: solid 1px #888;
  background-color: #888;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`

const BoardBackground = styled.div`
  height: 540px;
  width: 540px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 16px;
  left: 16px;
`

const Block = styled.div`
  height: 30px;
  width: 30px;
  box-sizing: border-box;
  border: solid 1px #888;
  background-color: #eee;
`

const StyleBoard = styled.div`
  height: 570px;
  width: 570px;
  border: solid 1px #eee;
  display: flex; 
  flex-wrap: wrap;
`

const StyleSquare = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`
const White = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`
const Black = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #222;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`
const Square = (props) => {
  const { value, handleClick, position } = props
  return (
    <StyleSquare onClick={() => handleClick(position)}>
      {value === 'Black' && <Black />}
      {value === 'White' && <White />}
    </StyleSquare>
  )
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired
}

const Board = (props) => {
  const { board, handleClick } = props
  return (
    <StyleBoard>
      {board.map((item, index) => 
          <Square
            // key={index}
            index={index}
            value={item}
            handleClick={handleClick}
            position={index}
          />       
      )}
    </StyleBoard>
  )

}
Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

function App() {
  const block = Array(18*18).fill(null)
  const [board, setBoard] = useState(Array(19*19).fill(null))
  const [blackIsNext, setBlackIsNext] = useState(true)

  block.map((item, index) => console.log(item, index) )

  const handleClick = (i) => {
    if (board[i] || caculateWinner(board)) {
      return 
    }
    let newBoard = JSON.parse(JSON.stringify(board))
    newBoard[i] = blackIsNext ? 'Black' : 'White'
    setBoard(newBoard)
    setBlackIsNext(!blackIsNext)
  }

  const caculateWinner = (checkBoard) => {
    const lines = [
      [0, 1, 2, 3, 4],
      [19, 20, 21, 22, 23],
      [38, 39, 40, 41, 42],
      [57, 58, 59, 60, 61],
      [76, 77, 78, 79, 80],
      [0, 19, 38, 57, 76],
      [1, 20, 39, 58, 77],
      [2, 21, 40, 59, 78],
      [3, 22, 41, 60, 79],
      [4, 23, 42, 61, 80],
      [0, 20, 40, 60, 80],
      [4, 22, 40, 58, 76]
    ]

    for (let i = 0; i <= 14; i++) {
      for (let j = 0; j <= 14; j++) {
        const newlines = lines.map((line) => {
          const newline = line.map( num => num + (i*19) + j)
          return newline
        })

        for (let k = 0; k < newlines.length; k++) {
          const [a, b, c, d, e] = newlines[k]
          if (
              checkBoard[a]
              && checkBoard[a] === checkBoard[b]
              && checkBoard[a] === checkBoard[c]
              && checkBoard[a] === checkBoard[d]
              && checkBoard[a] === checkBoard[e]
            ) {
              return board[a]
          }
        }
      }
    }
    return null
  }

  const winner = caculateWinner(board)
  let status
  if (winner) {
    status = `獲勝的是 ${(winner === 'Black' ? '【黑棋】' : '【白棋】')}` 
  } else {
    status = `下一位是 ${(blackIsNext ? '【黑棋】' : '【白棋】')}`
  }

  const handleReset = () => setBoard(Array(19*19).fill(null))

  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <Info>
          <Title>這是一個五子棋小遊戲</Title>
          <Status>{status}</Status>
          <Reset onClick={handleReset}>重新開始</Reset>
        </Info>
        <GameBoard>
          <BoardBackground>
            {block.map(item => 
              <Block>{item}</Block>
            )}
          </BoardBackground>
          <Board board={board} handleClick={handleClick}/>
        </GameBoard>
      </Container>
    </Fragment>
  )
}

export default App;
