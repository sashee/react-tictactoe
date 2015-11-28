"use strict";

const Header = React.createClass({
	displayName: "Header",
	propTypes: {
		gameStarted: React.PropTypes.bool.isRequired,
		crossTurn: React.PropTypes.bool,
		startGame: React.PropTypes.func.isRequired,
		winner: React.PropTypes.string
	},
	render() {
		return (
			<div>
				<h3>Welcome to the React.js Tic Tac Toe!</h3>
				{!this.props.gameStarted && <button
						className="btn btn-primary"
						onClick = {this.props.startGame}
					>Start a new game</button>
				}
				{this.props.winner &&
					<div>
						The winner is: {this.props.winner}
					</div>
				}
				{this.props.gameStarted &&
					<div>
						Current player: {this.props.crossTurn ? "X" : "O"}
					</div>
				}
			</div>
		);
	}
});

