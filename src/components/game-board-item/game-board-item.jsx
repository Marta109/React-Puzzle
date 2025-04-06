import GameBoardItemWord from "../game-board-item-word/game-board-item-word";
import "./game-board-item.css";

const GameBoardItem = ({ currentRound, word, index }) => {
  const isActive = currentRound === index;
  let currentRows = currentRound >= index;
  return (
    <div className={`gameBoardItem ${isActive ? "active" : "disabled"}`}>
      {currentRows && <div className="gameBoardItemNum">{index + 1}</div>}
      {currentRows && <GameBoardItemWord word={word} isActive={isActive} />}
    </div>
  );
};

export default GameBoardItem;
