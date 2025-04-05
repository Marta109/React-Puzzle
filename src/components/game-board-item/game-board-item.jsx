import GameBoardItemWord from "../game-board-item-word/game-board-item-word";
import "./game-board-item.css";

const GameBoardItem = ({ currentRound, showNum, word }) => {
  return (
    <div className="gameBoardItem">
      {showNum ? (
        <div className="gameBoardItemNum">{currentRound + 1}</div>
      ) : (
        ""
      )}
      {showNum ? <GameBoardItemWord word={word} /> : ""}
    </div>
  );
};

export default GameBoardItem;
