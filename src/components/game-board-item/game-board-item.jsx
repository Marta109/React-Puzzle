import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import GameBoardItemWord from "../game-board-item-word/game-board-item-word";
import "./game-board-item.css";

const GameBoardItem = ({
  currentRound,
  word,
  index,
  showPainting,
  isChecked,
}) => {
  const { isAutoComplete } = useContext(PuzzleContext);

  const isShow = showPainting ? "fadeOutOnGameBoard" : "";
  const isActive = currentRound === index;
  let currentRows = currentRound >= index;

  return (
    <div
      className={`gameBoardItem ${
        !isAutoComplete ? "active" : "disabled"
      }  ${isShow} `}
    >
      {currentRows && <div className="gameBoardItemNum">{index + 1}</div>}
      {currentRows && (
        <GameBoardItemWord
          word={word}
          isActive={isActive}
          isChecked={isChecked}
        />
      )}
    </div>
  );
};

export default GameBoardItem;
