import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./game-board-item-word.css";

const GameBoardItemWord = ({
  isActive,
  isChecked,
  roundIndex,
  sentenceIndex,
}) => {
  const { selectedWords, isCompleted, isAutoComplete, dispatch } =
    useContext(PuzzleContext);

  const sentenceWords = selectedWords?.[roundIndex]?.[sentenceIndex] || [];

  const handleRemove = (index) => {
    dispatch({
      type: "REMOVE_SELECTED_WORD",
      payload: {
        roundIndex,
        sentenceIndex,
        indexToRemove: index,
      },
    });
  };

  return (
    <>
      {sentenceWords.map((item, index) => {
        let checkClass =
          isChecked && item?.isCorrect
            ? "correctWord"
            : item?.isCorrect === false
            ? "inCorrectWord"
            : "";

        if (isAutoComplete) {
          checkClass = "";
        }

        return (
          <div
            key={index}
            className={`gameBoardItemWord draggable ${checkClass}`}
            draggable={isActive && !isCompleted}
            onClick={
              isActive && !isCompleted ? () => handleRemove(index) : undefined
            }
          >
            {item ? (
              isAutoComplete ? (
                <div className="">{item.word}</div>
              ) : (
                <PuzzlePiece
                  word={item.word}
                  stringArrLength={item.stringArrLength}
                  itemIndex={item.itemIndex}
                />
              )
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};

export default GameBoardItemWord;
