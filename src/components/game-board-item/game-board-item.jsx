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
  setIsChecked
}) => {
  const { isAutoComplete } = useContext(PuzzleContext);

  const isShow = showPainting ? "fadeOutOnGameBoard" : "";
  const isActive = currentRound === index;
  let currentRows = currentRound >= index;
  let disableClass = isActive ? "active" : "disabled";
  if (isAutoComplete) {
    disableClass = "disabled";
  }



  if (!sentenceWords) return null;

  return (
    <div className={`gameBoardItem ${disableClass} ${isShow}`}>
      {currentRows && <div className="gameBoardItemNum">{index + 1}</div>}
      {currentRows &&
        sentenceWords.map((word, idx) => (
          <GameBoardItemWord
            key={idx}
            word={word}
            isActive={isActive}
            setIsChecked={setIsChecked}
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
