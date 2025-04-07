import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./puzzle-board-item.css";

const PuzzleBoardItem = ({ word, index, itemIndex, stringArrLength }) => {
  const { dispatch, availableWords } = useContext(PuzzleContext);

  const wordObj = availableWords.find((el) => el.word === word);

  const handleClick = () => {
    if (wordObj) {
      dispatch({
        type: "ADD_SELECTED_WORD",
        payload: {
          word,
          stringArrLength,
          itemIndex: itemIndex + "-" + wordObj.word,
        },
      });
    }
  };

  return (
    <div
      className="puzzleItem draggable"
      draggable="true"
      id={`puzzleItem_${index}`}
      onClick={handleClick}
    >
      {wordObj ? (
        <PuzzlePiece
          word={wordObj.word}
          stringArrLength={wordObj.stringArrLength}
          itemIndex={wordObj.itemIndex}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PuzzleBoardItem;