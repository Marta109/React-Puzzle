import "./game-board-item-word.css";

const GameBoardItemWord = ({ word }) => {
  const wordArr = word.split(" ");

  const handleClick = (e) => {
    const spans = e.currentTarget.querySelectorAll("span");
    const emptyPuzzleItem = document.querySelector(
      ".puzzleItem:not(:has(span))"
    );

    if (emptyPuzzleItem && spans.length > 0) {
      spans.forEach((span) => {
        const clone = span.cloneNode(true);
        emptyPuzzleItem.appendChild(clone);
        span.remove();
      });
    }
  };

  return (
    <>
      {wordArr.map((word, index) => (
        <div
          key={index}
          className="gameBoardItemWord draggable"
          onClick={handleClick}
        ></div>
      ))}
    </>
  );
};

export default GameBoardItemWord;
