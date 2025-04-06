import "./game-board-item-word.css";

const GameBoardItemWord = ({ word, isActive }) => {
  const wordArr = word.split(" ");
  if (!isActive) return;
  console.log(word);
  const handleClick = () => {};

  return (
    <>
      {wordArr.map((word, index) => (
        <div
          key={index}
          className="gameBoardItemWord draggable"
          onClick={isActive ? handleClick : undefined}
          draggable={isActive}
        ></div>
      ))}
    </>
  );
};

export default GameBoardItemWord;
