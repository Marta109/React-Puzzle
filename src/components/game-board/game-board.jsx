import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import GameBoardItem from "../game-board-item/game-board-item";
import "./game-board.css";

const GameBoard = () => {
  const { sentenceArr, currentRound } = useContext(PuzzleContext);

  return (
    <div className="game-board">
      {sentenceArr.map((word, index) => (
        <GameBoardItem
          key={index}
          word={word.textExample}
          currentRound={currentRound}
          showNum={currentRound === index}
        />
      ))}
    </div>
  );
};

export default GameBoard;
