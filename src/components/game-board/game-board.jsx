import "./game-board.css";

const GameBoard=()=>{
    return(
        <div className="game-board">
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
        </div>
    )
}

export default GameBoard;