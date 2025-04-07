import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import GameBoardItemWord from "../game-board-item-word/game-board-item-word";
import "./game-board-item.css";

const GameBoardItem = ({
  currentRound,
  index,
  showPainting,
  isChecked,
  sentenceIndex,
  sentenceWords, 
}) => {
  const { isAutoComplete } = useContext(PuzzleContext);

  const isShow = showPainting ? "fadeOutOnGameBoard" : "";
  const isActive = currentRound === index;
  let currentRows = currentRound >= index;

  if (!sentenceWords) return null;

  return (
    <div
      className={`gameBoardItem ${
        !isAutoComplete ? "active" : "disabled"
      }  ${isShow} ${isActive ? "" : "disabled"} `}
    >
      {currentRows && <div className="gameBoardItemNum">{index + 1}</div>}
      {currentRows &&
        sentenceWords.map((word, idx) => (
          <GameBoardItemWord
            key={idx}
            word={word}
            isActive={isActive}
            isChecked={isChecked}
            sentenceIndex={sentenceIndex}
            stringArrLength={sentenceWords.length}
            index={idx}
          />
        ))}
    </div>
  );
};

export default GameBoardItem;
