import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzleBoardItem from "../puzzle-board-item/puzzle-board-item";
import "./puzzle-board.css";

const mixingArr = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const PuzzleBoard = () => {
  const { currentSentence } = useContext(PuzzleContext);
  if (!currentSentence) return null;

  const sentenceArr = currentSentence.textExample
    .split(" ")
    .map((word, id) => ({
      id: `${word}-${id}`,
      word,
    }));

  const mixArr = mixingArr([...sentenceArr]);

  return (
    <div className="puzzlesBoard">
      {mixArr.map((item, index) => {
        const itemIndex = sentenceArr.findIndex((el) => el.id === item.id);
        return (
          <PuzzleBoardItem
            key={item.id.toLowerCase() + item.word}
            word={item.word}
            index={index}
            itemIndex={itemIndex}
            stringArrLength={sentenceArr.length - 1}
          />
        );
      })}
    </div>
  );
};

export default PuzzleBoard;
