import { useContext, useState, useEffect } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../button/button";
import "./game-btn-controller.css";

const GameBtnController = ({ setShowPainting, setIsChecked, showPainting }) => {
  const {
    currentSentence,
    selectedWords,
    availableWords,
    isAutoComplete,
    currentRound,
    currentPage,
    sentenceArr,
    dispatch,
  } = useContext(PuzzleContext);

  const [autoComplete, setIsAutoComplete] = useState(true);
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);
  const [nextPuzzleEnabled, setNextPuzzleEnabled] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);

  useEffect(() => {
    setIsCheckEnabled(availableWords.length === 0 && !isAutoComplete);
  }, [availableWords, isAutoComplete]);

  useEffect(() => {
    const isLast = currentRound === sentenceArr.length - 1;
    setShowPuzzle(isLast);
  }, [currentRound, sentenceArr]);

  const checkPuzzle = () => {
    const correctWords = currentSentence.textExample.split(" ");
    let isCorrect = true;

    const updatedRoundWords = selectedWords[currentPage].map((item, index) => {
      if (!item) return null;

      const wordInGameBoard = item.word;
      if (wordInGameBoard !== correctWords[index]) {
        isCorrect = false;
        return { ...item, isCorrect: false };
      } else {
        return { ...item, isCorrect: true };
      }
    });

    const updatedSelectedWords = [...selectedWords];
    updatedSelectedWords[currentPage] = updatedRoundWords;

    dispatch({
      type: "UPDATE_SELECTED_WORDS",
      payload: updatedSelectedWords,
    });

    setIsChecked(true);

    if (isCorrect) {
      setNextPuzzleEnabled(true);
      setIsCheckEnabled(false);
      setIsAutoComplete(false);
    } else {
      setNextPuzzleEnabled(false);
      setIsAutoComplete(true);
    }
  };

  const handleAutoComplete = () => {
    dispatch({ type: "AUTO_COMPLETE" });
    setIsAutoComplete(false);
    setIsCheckEnabled(false);
    setNextPuzzleEnabled(true);
  };

  const handlerNextPuzzle = () => {
    setIsCheckEnabled(false);
    setIsAutoComplete(true);
    setNextPuzzleEnabled(false);
    setIsChecked(false);
    dispatch({ type: "NEXT_SENTENCE" });
  };

  const handleShowPuzzle = () => {
    setShowPainting(true);
    setNextPuzzleEnabled(false);
  };

  const handleNextRound = () => {
    setShowPainting(false);
    setNextPuzzleEnabled(false);
    setIsAutoComplete(true);
    dispatch({ type: "NEXT_ROUND" });
  };
  return (
    <div className="puzzlesBoardBtns">
      {showPainting && !nextPuzzleEnabled ? (
        <>
          <Button
            type="button"
            child="results"
            classes="btn-header"
            // onClick={}
          />
          <Button
            type="button"
            child="next round"
            classes="btn-header"
            onClick={handleNextRound}
          />
        </>
      ) : (
        <>
          <Button
            type="button"
            child="Check"
            disabled={!isCheckEnabled}
            classes={`btn-header ${!isCheckEnabled ? "disabled" : ""}`}
            onClick={checkPuzzle}
          />
          <Button
            type="button"
            child="Auto Complete"
            disabled={!autoComplete}
            classes={`btn-header ${!autoComplete ? "disabled" : ""}`}
            onClick={handleAutoComplete}
          />
          <Button
            type="button"
            child={showPuzzle ? "Show Puzzle" : "next puzzle"}
            disabled={!nextPuzzleEnabled}
            classes={`btn-header ${!nextPuzzleEnabled ? "disabled" : ""}`}
            onClick={showPuzzle ? handleShowPuzzle : handlerNextPuzzle}
          />
        </>
      )}
    </div>
  );
};

export default GameBtnController;
