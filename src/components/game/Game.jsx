"use strict";

const Game = React.createClass({
	displayName: "Game",
	propTypes: {
		gameStarted: React.PropTypes.bool.isRequired,
		crossTurn: React.PropTypes.bool,
		placed: React.PropTypes.func.isRequired,
		endGame: React.PropTypes.func.isRequired
	},
	getInitialState() {
		return {
			table: this.emptyBoard(),
			highlighted: [undefined, undefined]
		};
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.gameStarted && !this.props.gameStarted) {
			this.setState({table: this.emptyBoard()});
		}
	},
	componentDidUpdate(prevProps, prevState) {
		const winner = this.getWinningPlayer(this.state.table);
		const prevWinner = this.getWinningPlayer(prevState.table);

		if (winner && prevWinner !== winner) {
			this.props.endGame(winner);
		}else {
			const tableFull = this.isTableFull(this.state.table);
			const prevTableFull = this.isTableFull(prevState.table);

			if (tableFull && prevTableFull !== tableFull) {
				this.props.endGame(null);
			}
		}
	},
	placeMark(rowIndex, cellIndex) {
		if (this.isValidMove(rowIndex, cellIndex)) {
			this.setState({table: this.getModifiedBoard(this.state.table, rowIndex, cellIndex, this.props.crossTurn ? "X" : "O"), highlighted: [undefined, undefined]});
			this.props.placed();
		}
	},
	emptyBoard() {
		return _.range(0, 3).map(() => {
			return _.range(0, 3).map(() => {
				return null;
			})
		});
	},
	getModifiedBoard(board, y, x, value) {
		return board.map((row, rowIndex) => {
			return row.map((cell, cellIndex) => {
				return rowIndex === y && cellIndex === x ? value : cell;
			});
		});
	},
	isValidMove(rowIndex, cellIndex) {
		return this.props.gameStarted && !this.state.table[rowIndex][cellIndex];
	},
	highlightMove(rowIndex, cellIndex) {
		this.setState({highlighted: [undefined, undefined]});
		if (rowIndex !== undefined && cellIndex !== undefined && this.isValidMove(rowIndex, cellIndex)) {
			this.setState({highlighted: [rowIndex, cellIndex]});
		}
	},
	getWinningPlayer(table) {
		const checkPlayer = (player) => {
			const checkRows = () => {
				return _.some(table, (row) => {
					return _.every(row, (cell) => {
						return cell === player;
					});
				});
			};
			const checkCols = () => {
				return _.some(_.range(0, 3), (col) => {
					return _.every(table, (row) => {
						return row[col] === player;
					});
				});
			};
			const checkDiagonals = () => {
				return _.every(_.range(0, 3), (index) => {
					return table[index][index] === player;
				}) ||
				_.every(_.range(0, 3), (index) => {
					return table[index][2 - index] === player;
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
	isTableFull(table) {
		return _.all(table, (row) => {
			return _.all(row, (cell) => {
				return cell !== null;
			});
		});
	},
	render() {
		return (
			<div
				className="game"
			>
				{this.state.table.map((row, rowIndex) => {
					return (
						<div
							className="row"
							key={rowIndex}
						>
							{row.map((cell, cellIndex) => {
								return (
									<div
										className="cell"
										key={cellIndex}
										onClick={this.placeMark.bind(null, rowIndex, cellIndex)}
										onMouseOver={this.highlightMove.bind(null, rowIndex, cellIndex)}
										onMouseLeave={this.highlightMove.bind(null, undefined, undefined)}
									>
										{(cell === "X" || this.state.highlighted[0] === rowIndex && this.state.highlighted[1] === cellIndex && this.props.crossTurn) && <svg
													viewBox = "0 0 1 1"
													className={classNames({highlighted: cell !== "X"})}
												>
												<line x1 = "0" y1 = "0" x2 = "1" y2 = "1"/>
												<line x1 = "1" y1 = "0" x2 = "0" y2 = "1"/>
											</svg>
										}
										{(cell === "O" || this.state.highlighted[0] === rowIndex && this.state.highlighted[1] === cellIndex && !this.props.crossTurn) && <svg
													viewBox = "0 0 1 1"
													className={classNames({highlighted: cell !== "O"})}
												>
												<circle cx = "0.5" cy = "0.5" r = "0.45"/>
											</svg>
										}
									</div>
								);
							})}
						</div>
					);
			 })}
			</div>
		);
	}
});

