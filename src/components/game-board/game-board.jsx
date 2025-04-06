import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import GameBoardItem from "../game-board-item/game-board-item";
import "./game-board.css";

const GameBoard = ({ showPainting }) => {
  const { sentenceArr, currentRound, levelData } = useContext(PuzzleContext);

  const gameBoardStyle = showPainting
    ? {
        backgroundImage: `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "51%",
        height: "100%",
        borderRadius: "16px",
        objectFit: "fill",
      }
    : {};

  return (
    <div className="game-board" style={gameBoardStyle}>
      {sentenceArr.map((word, index) => (
        <GameBoardItem
          showPainting={showPainting}
          key={index}
          word={word.textExample}
          currentRound={currentRound}
          index={index}
        />
      ))}
    </div>
  );
};

export default GameBoard;
