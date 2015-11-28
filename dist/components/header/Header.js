"use strict";

var Header = React.createClass({
	displayName: "Header",
	propTypes: {
		gameStarted: React.PropTypes.bool.isRequired,
		crossTurn: React.PropTypes.bool,
		startGame: React.PropTypes.func.isRequired,
		winner: React.PropTypes.string
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				null,
				"Welcome to the React.js Tic Tac Toe!"
			),
			!this.props.gameStarted && React.createElement(
				"button",
				{
					className: "btn btn-primary",
					onClick: this.props.startGame
				},
				"Start a new game"
			),
			this.props.winner && React.createElement(
				"div",
				null,
				"The winner is: ",
				this.props.winner
			),
			this.props.gameStarted && React.createElement(
				"div",
				null,
				"Current player: ",
				this.props.crossTurn ? "X" : "O"
			)
		);
	}
});
//# sourceMappingURL=Header.js.map
