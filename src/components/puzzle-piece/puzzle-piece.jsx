import "./puzzle-piece.css";

const PuzzlePiece = ({ word, itemIndex, stringArrLength }) => {
  const bothSide = itemIndex !== 0 && itemIndex !== stringArrLength;

  return (
    <>
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
    </>
  );
};

export default PuzzlePiece;
