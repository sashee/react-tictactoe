"use strict";

var Game = React.createClass({
	displayName: "Game",
	propTypes: {
		gameStarted: React.PropTypes.bool.isRequired,
		crossTurn: React.PropTypes.bool,
		placed: React.PropTypes.func.isRequired,
		endGame: React.PropTypes.func.isRequired
	},
	getInitialState: function getInitialState() {
		return {
			table: this.emptyBoard(),
			highlighted: [undefined, undefined]
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.gameStarted && !this.props.gameStarted) {
			this.setState({ table: this.emptyBoard() });
		}
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		var winner = this.getWinningPlayer(this.state);
		var prevWinner = this.getWinningPlayer(prevState);

		if (winner && prevWinner !== winner) {
			this.props.endGame(winner);
		}
	},
	placeMark: function placeMark(rowIndex, cellIndex) {
		if (this.isValidMove(rowIndex, cellIndex)) {
			this.setState({ table: this.getModifiedBoard(this.state.table, rowIndex, cellIndex, this.props.crossTurn ? "X" : "O"), highlighted: [undefined, undefined] });
			this.props.placed();
		}
	},
	emptyBoard: function emptyBoard() {
		return _.range(0, 3).map(function () {
			return _.range(0, 3).map(function () {
				return null;
			});
		});
	},
	getModifiedBoard: function getModifiedBoard(board, y, x, value) {
		return board.map(function (row, rowIndex) {
			return row.map(function (cell, cellIndex) {
				return rowIndex === y && cellIndex === x ? value : cell;
			});
		});
	},
	isValidMove: function isValidMove(rowIndex, cellIndex) {
		return this.props.gameStarted && !this.state.table[rowIndex][cellIndex];
	},
	highlightMove: function highlightMove(rowIndex, cellIndex) {
		this.setState({ highlighted: [undefined, undefined] });
		if (rowIndex !== undefined && cellIndex !== undefined && this.isValidMove(rowIndex, cellIndex)) {
			this.setState({ highlighted: [rowIndex, cellIndex] });
		}
	},
	getWinningPlayer: function getWinningPlayer(state) {
		var checkPlayer = function checkPlayer(player) {
			var checkRows = function checkRows() {
				return _.some(state.table, function (row) {
					return _.every(row, function (cell) {
						return cell === player;
					});
				});
			};
			var checkCols = function checkCols() {
				return _.some(_.range(0, 3), function (col) {
					return _.every(state.table, function (row) {
						return row[col] === player;
					});
				});
			};
			var checkDiagonals = function checkDiagonals() {
				return _.every(_.range(0, 3), function (index) {
					return state.table[index][index] === player;
				}) || _.every(_.range(0, 3), function (index) {
					return state.table[index][2 - index] === player;
				});
			};

			return checkRows() || checkCols() || checkDiagonals();
		};

		if (checkPlayer("X")) {
			return "X";
		}
		if (checkPlayer("O")) {
			return "O";
		}
		return undefined;
	},
	render: function render() {
		var _this = this;

		return React.createElement(
			"div",
			{
				className: "game"
			},
			this.state.table.map(function (row, rowIndex) {
				return React.createElement(
					"div",
					{
						className: "row",
						key: rowIndex
					},
					row.map(function (cell, cellIndex) {
						return React.createElement(
							"div",
							{
								className: "cell",
								key: cellIndex,
								onClick: _this.placeMark.bind(null, rowIndex, cellIndex),
								onMouseOver: _this.highlightMove.bind(null, rowIndex, cellIndex),
								onMouseLeave: _this.highlightMove.bind(null, undefined, undefined)
							},
							(cell === "X" || _this.state.highlighted[0] === rowIndex && _this.state.highlighted[1] === cellIndex && _this.props.crossTurn) && React.createElement(
								"svg",
								{
									viewBox: "0 0 1 1",
									className: classNames({ highlighted: cell !== "X" })
								},
								React.createElement("line", { x1: "0", y1: "0", x2: "1", y2: "1" }),
								React.createElement("line", { x1: "1", y1: "0", x2: "0", y2: "1" })
							),
							(cell === "O" || _this.state.highlighted[0] === rowIndex && _this.state.highlighted[1] === cellIndex && !_this.props.crossTurn) && React.createElement(
								"svg",
								{
									viewBox: "0 0 1 1",
									className: classNames({ highlighted: cell !== "O" })
								},
								React.createElement("circle", { cx: "0.5", cy: "0.5", r: "0.45" })
							)
						);
					})
				);
			})
		);
	}
});
//# sourceMappingURL=Game.js.map
