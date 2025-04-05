import PuzzlePiece from "../puzzle-piece/puzzle-piece";
import "./puzzle-board-item.css";

const PuzzleBoardItem = ({ word, index, itemIndex, stringArrLength }) => {

  const handleClick = (e) => {
    const spans = e.currentTarget.querySelectorAll("span");
    const emptyCell = document.querySelector(".gameBoardItemWord:not(:has(*))");

    if (emptyCell && spans.length > 0) {
      emptyCell.innerHTML = "";

      spans.forEach((span) => {
        const clone = span.cloneNode(true);
        emptyCell.appendChild(clone);
        span.remove();
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
      <PuzzlePiece
        word={word}
        stringArrLength={stringArrLength}
        itemIndex={itemIndex}
      />
    </div>
  );
};

export default PuzzleBoardItem;
