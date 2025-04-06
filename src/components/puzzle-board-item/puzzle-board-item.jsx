import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./puzzle-board-item.css";

const PuzzleBoardItem = ({ word, index, itemIndex, stringArrLength }) => {
  const { dispatch, availableWords } = useContext(PuzzleContext);

  const isWordAvailable = availableWords.includes(word);

  const handleClick = () => {
    if (isWordAvailable) {
      dispatch({
        type: "ADD_SELECTED_WORD",
        payload: { word, stringArrLength, itemIndex },
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
      {isWordAvailable ? (
        <PuzzlePiece
          word={word}
          stringArrLength={stringArrLength}
          itemIndex={itemIndex}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PuzzleBoardItem;
