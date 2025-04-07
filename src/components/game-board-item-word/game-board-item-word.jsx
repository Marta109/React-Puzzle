import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./game-board-item-word.css";

const GameBoardItemWord = ({
  isActive,
  isChecked,
  sentenceIndex,
  word,
  setIsChecked,
  index,
}) => {
  const { isAutoComplete, dispatch } = useContext(PuzzleContext);

  const handleRemove = () => {
    if (!word) return;

    dispatch({
      type: "REMOVE_SELECTED_WORD",
      payload: {
        sentenceIndex,
        indexToRemove: index,
        itemIndex: word.itemIndex,
      },
    });
    setIsChecked(false);
  };

  let checkedClass = isChecked
    ? isChecked && word?.isCorrect
      ? "correctWord"
      : "inCorrectWord"
    : "";
  if (word === null || !isActive) {
    checkedClass = "";
  }

  // let showBorder={!word.autocompleted?"greenBorder":"" }
  return (
    <div
      className={`gameBoardItemWord draggable ${checkedClass} `}
      onClick={handleRemove}
    >
      {word ? (
        isAutoComplete || word.autocompleted ? (
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
