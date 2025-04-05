import "./puzzle-board-item.css";

const PuzzleBoardItem = ({ word, index, itemIndex, stringArrLength }) => {
  const bothSide = itemIndex !== 0 && itemIndex !== stringArrLength;

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
