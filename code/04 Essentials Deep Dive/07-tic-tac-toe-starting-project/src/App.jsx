import Player from "./componentes/Player.jsx";
import GameBoard from "./componentes/GameBoard.jsx";
import {useState} from "react";
import Log from "./componentes/Log.jsx";
import GameOver from "./componentes/GameOver.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],

]

function derivedActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    const [players, setPlayers] = useState({
        'X': 'Player 1',
        'O' : 'Player 2'
    });
    const [gameTurns, setGameTurns] = useState([]);

    let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdsSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol && thirdsSquareSymbol) {
            winner = players[firstSquareSymbol];

        }
    }
    const activePlayer = derivedActivePlayer(gameTurns);

    const hasDraw = gameTurns.length === 9 && !winner;

    const handleRestart = () => {
        setGameTurns([]);
    }
    function handleSelectSquare(rowIndex, colIndex) {
        const activePlayer = derivedActivePlayer(gameTurns);
        setGameTurns(prevState => {
            const currentPlayer = derivedActivePlayer(prevState);
            return [{
                square: {
                    row: rowIndex,
                    col: colIndex
                }, player: currentPlayer
            }, ...prevState];
        });
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevState => {
            return {
                ...prevState,
                [symbol]: newName
            }
        });
    }
    return (<main>
        <div id="game-container">
            <ol id="players" className='highlight-player'>
                <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
                <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
            </ol>
            {(winner || hasDraw) && <GameOver handleRematch={handleRestart} winner={winner}/>}
            <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}
                       board={gameBoard}></GameBoard>

        </div>
        <Log turns={gameTurns}/>
    </main>)
}

export default App
