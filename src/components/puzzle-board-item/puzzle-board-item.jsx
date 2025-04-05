import "./puzzle-board-item.css";

const PuzzleBoardItem = ({ word, index, itemIndex, stringArrLength }) => {
  const bothSide = itemIndex !== 0 && itemIndex !== stringArrLength;
  return (
    <div
      className="puzzleItem draggable"
      draggable="true"
      id={`puzzleItem_${index}`}
    >
      <span className="text">{word}</span>
      <span
        className={
          itemIndex === 0
            ? "shapeRight"
            : itemIndex === stringArrLength
            ? "shapeLeft"
            : "shapeRight"
        }
      ></span>
      {bothSide && <span className="shapeLeft"></span>}
    </div>
  );
};

export default PuzzleBoardItem;
