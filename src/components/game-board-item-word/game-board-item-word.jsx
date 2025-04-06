import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import "./game-board-item-word.css";
import PuzzlePiece from "../puzzle-piece/puzzle-piece";

const GameBoardItemWord = ({ isActive }) => {
  const { selectedWords, dispatch } = useContext(PuzzleContext);

  if (!isActive) return;

  const handleRemove = (index) => {
    dispatch({
      type: "REMOVE_SELECTED_WORD",
      payload: { indexToRemove: index },
    });
  };

  return (
    <>
      {selectedWords.map((item, index) => (
        <div
          key={index}
          className="gameBoardItemWord draggable"
          draggable={isActive}
          onClick={isActive && item ? () => handleRemove(index) : undefined}
        >
          {item ? (
            <PuzzlePiece
              word={item.word}
              stringArrLength={item.stringArrLength}
              itemIndex={item.itemIndex}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default GameBoardItemWord;
