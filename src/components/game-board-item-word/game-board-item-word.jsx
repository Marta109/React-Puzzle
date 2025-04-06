import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./game-board-item-word.css";

const GameBoardItemWord = ({ isActive, isChecked }) => {
  const { selectedWords, isCompleted, isAutoComplete, dispatch } =
    useContext(PuzzleContext);

  if (!isActive) return;

  const handleRemove = (index) => {
    dispatch({
      type: "REMOVE_SELECTED_WORD",
      payload: { indexToRemove: index },
    });
  };

  return (
    <>
      {selectedWords.map((item, index) => {
        const checkClass =
          isChecked && item?.isCorrect
            ? "correctWord"
            : item?.isCorrect === false
            ? "inCorrectWord"
            : "";

        // const checkClass = isChecked
        //   ? item?.isCorrect
        //     ? "correctWord"
        //     : "inCorrectWord"
        //   : "";
        return (
          <div
            key={index}
            className={`gameBoardItemWord  draggable ${checkClass} `}
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
