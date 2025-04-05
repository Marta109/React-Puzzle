import "./game-board-item-word.css";

const GameBoardItemWord = ({ word }) => {
  const wordArr = word.split(" ");
  return (
    <>
      {wordArr.map(( index) => (
        <div key={index} className="gameBoardItemWord draggable">
        </div>
      ))}
    </>
  );
};

export default GameBoardItemWord;
