import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./game-board-item-word.css";

const GameBoardItemWord = ({
  isActive,
  isChecked,
  sentenceIndex,
  word,
  index,
}) => {
  const { isCompleted, isAutoComplete, dispatch } = useContext(PuzzleContext);

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_SELECTED_WORD",
      payload: {
        sentenceIndex,
        indexToRemove: index,
        itemIndex: word.itemIndex,
      },
    });
  };

  let checkedClass = isChecked
    ? isChecked && word?.isCorrect
      ? "correctWord"
      : "inCorrectWord"
    : "";
  if (word === null) {
    checkedClass = "";
  }

  return (
    <div
      className={`gameBoardItemWord draggable ${checkedClass}`}
      draggable={isActive && !isCompleted}
      onClick={isActive && !isCompleted ? () => handleRemove() : undefined}
    >
      {word ? (
        isAutoComplete ? (
          <div>{word.word}</div>
        ) : (
          <PuzzlePiece
            word={word.word}
            stringArrLength={word.stringArrLength}
            itemIndex={word.itemIndex}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default GameBoardItemWord;
