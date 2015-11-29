"use strict";

const TicTacToe = React.createClass({
	displayName: "TicTacToe",
	getInitialState() {
		return {
			gameStarted: true,
			crossTurn: true
		};
	},
	startGame() {
		this.setState({
			gameStarted: true,
			crossTurn: true,
			winner: undefined
		});
	},
	placed() {
		this.setState({crossTurn: !this.state.crossTurn});
	},
	endGame(winner) {
		this.setState({
			gameStarted: false,
			winner
		});
	},
	render() {
		return (
			<div
				className="tictactoe"
			>
				<Header
					gameStarted={this.state.gameStarted}
					crossTurn={this.state.crossTurn}
					startGame={this.startGame}
					winner={this.state.winner}
				/>
				<Game
					gameStarted={this.state.gameStarted}
					crossTurn={this.state.crossTurn}
					placed = {this.placed}
					endGame = {this.endGame}
				/>
			</div>
		);
	}
});
