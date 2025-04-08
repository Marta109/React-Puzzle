import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import GameBoardItem from "../game-board-item/game-board-item";
import "./game-board.css";

const GameBoard = ({ showPainting, isChecked, setIsChecked }) => {
  const { sentenceArr, currentRound, levelData, currentPage, selectedWords } =
    useContext(PuzzleContext);

  const gameBoardStyle = showPainting
    ? {
        backgroundImage: `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "90%",
        height: "100vh",
        borderRadius: "16px",
        objectFit: "fill",
      }
    : {};

  const gameBoardClass = showPainting
    ? "game-board show-background"
    : "game-board";

    

  return (
    <div className={gameBoardClass} style={gameBoardStyle}>
      {sentenceArr.map((word, index) => (
        <GameBoardItem
          showPainting={showPainting}
          key={currentPage + "-" + index}
          word={word.textExample}
          currentRound={currentRound}
          index={index}
          isChecked={isChecked}
          isCompleted={word.isCompleted}
          sentenceIndex={index}
          sentenceWords={selectedWords[index]}
          setIsChecked={setIsChecked}
        />
      ))}
    </div>
  );
};

export default GameBoard;
