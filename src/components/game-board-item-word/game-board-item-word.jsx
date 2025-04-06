import "./game-board-item-word.css";

const GameBoardItemWord = ({ word, isActive }) => {
  const wordArr = word.split(" ");

  const handleClick = (e) => {
    if (!isActive) return;
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
      {wordArr.map(
        (word, index) => (
          (
            <div
              key={index}
              className="gameBoardItemWord draggable"
              onClick={isActive ? handleClick : undefined}
              draggable={isActive}
            ></div>
          )
        )
      )}
    </>
  );
};

export default GameBoardItemWord;
