import React, { Component } from 'react';
import Board from './Board';

const myTictactoeBoard = (squares) => {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < rows.length; i += 1) {
    const [a, b, c] = rows[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: rows[i] };
    }
  }

  return { winner: null, winnerRow: null };
};



class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      currentStepNumber: 0,
      playerNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (myTictactoeBoard(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.playerNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          stepNumber: history.length,
        },
      ]),
      playerNext: !this.state.playerNext,
      currentStepNumber: history.length,
    });
  }





  render() {
    const { history } = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = myTictactoeBoard(current.squares);



    let status;
    if (winner) {
      status = `Winner is - ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    }
    else if (history.length === 1) {
      status = 'First Player - X';
    }
    else {
      status = `Next player: ${this.state.playerNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

        </div>
      </div>
    );
  }
}

export default Game;
