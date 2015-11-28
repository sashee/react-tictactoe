"use strict";

var TicTacToe = React.createClass({
	displayName: "TicTacToe",
	getInitialState: function getInitialState() {
		return {
			gameStarted: false
		};
	},
	startGame: function startGame() {
		this.setState({
			gameStarted: true,
			crossTurn: true,
			winner: undefined
		});
	},
	placed: function placed() {
		this.setState({ crossTurn: !this.state.crossTurn });
	},
	endGame: function endGame(winner) {
		this.setState({
			gameStarted: false,
			winner: winner
		});
	},
	render: function render() {
		return React.createElement(
			"div",
			{
				className: "tictactoe"
			},
			React.createElement(Header, {
				gameStarted: this.state.gameStarted,
				crossTurn: this.state.crossTurn,
				startGame: this.startGame,
				winner: this.state.winner
			}),
			React.createElement(Game, {
				gameStarted: this.state.gameStarted,
				crossTurn: this.state.crossTurn,
				placed: this.placed,
				endGame: this.endGame
			})
		);
	}
});
//# sourceMappingURL=TicTacToe.js.map
