import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
	return (
		<button 
			className="square" 
			onClick= { props.onClick }
		>
			{ props.value }
		</button>
	);    
}
  
class Board extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			squares:  Array(9).fill(null),
		}
	}

	handleClick(i){
		//call .slice() to create a copy of the squares array to modify instead of modifying the existing array
		const squares = this.state.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] =  'X' ;

		this.setState({
			squares : squares,
		});

		//puffkum's move

		if(calculateWinner(squares)) {
			return;
		}

		var comp = Math.floor(Math.random() * 9);

		while(squares[comp]){
			comp = Math.floor(Math.random() * 9);
		}	

		squares[comp] = 'O';

		this.setState({
			squares : squares,
		});
		
	}

	renderSquare(i) {
		return( <Square 
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
			/>);
	}    

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
		  status = 'Winner: ' + winner;
		} else {
		  status = 'Play it X goes first & computer plays ' + this.state.comp ;
		}

		const boardSize = 3;
		const squares = []

		for (let i = 0; i < boardSize ; ++i) {
			let row = [];
			for (let j = 0; j < boardSize; ++j) {
				row.push(this.renderSquare(i * boardSize + j));
			}
			squares.push(<div className="board-row" key ={i}>{ row }</div>)
		}

		return (        
		<div>
			<div className="status">
				{status}
			</div>
			<div>
				{squares}
			</div>        
		</div>
		);
	}
}
  
class Game extends React.Component {
	render() {
		return (
		<div className="game">
			<div className="game-board">
			<Board />
			</div>
			<div className="game-info">
			<div>{/* status */}</div>
			<ol>{/* TODO */}</ol>
			</div>
		</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
}
  
  // ========================================
  
ReactDOM.render(
	<Game />,
	document.getElementById('root')
  );
  