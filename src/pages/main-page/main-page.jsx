import { useContext, useEffect, useRef, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../../components/button/button";
import GameBoard from "../../components/game-board/game-board";
import GameHint from "../../components/game-hint/game-hint";
import PuzzleBoard from "../../components/puzzle-board/puzzle-board";
import "./main-page.css";
import PaintingInfo from "../../components/painting-info/painting-info";

const MainPage = () => {
  const { currentSentence, currentRound, sentenceArr, currentPage } =
    useContext(PuzzleContext);
  const { dispatch } = useContext(PuzzleContext);
  const [isAutoComplete, setIsAutoComplete] = useState(true);
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);
  const [nextPuzzleEnabled, setNextPuzzleEnabled] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showPainting, setShowPainting] = useState(false);
  const gameBoardRef = useRef(null);
  const observerRef = useRef(null);

  const resetWordStyles = () => {
    const gameBoardItems =
      gameBoardRef.current?.querySelectorAll(".gameBoardItemWord");
    gameBoardItems?.forEach((item) => {
      item.classList.remove("correctWord", "inCorrectWord");
    });
  };

  const checkIfAllFilled = () => {
    const items = gameBoardRef.current?.querySelectorAll(".gameBoardItemWord");
    if (!items) return;

    const allFilled = Array.from(items).every((item) =>
      item.querySelector("span")
    );
    setIsCheckEnabled(allFilled);
  };

  useEffect(() => {
    checkIfAllFilled();

    observerRef.current = new MutationObserver(() => {
      resetWordStyles();
      checkIfAllFilled();
    });

    if (gameBoardRef.current) {
      observerRef.current.observe(gameBoardRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const isLast = currentRound === sentenceArr.length - 1;
    setShowPuzzle(isLast);
  }, [currentRound, sentenceArr]);

  const checkPuzzle = () => {
    const correctWords = currentSentence.textExample.split(" ");
    const gameBoardItems = gameBoardRef.current.querySelectorAll(
      ".gameBoardItem.active .gameBoardItemWord"
    );

    let isCorrect = true;

    gameBoardItems.forEach((item, index) => {
      const span = item.querySelector("span");
      const wordInGameBoard = span?.innerText;
      if (wordInGameBoard !== correctWords[index]) {
        isCorrect = false;
        item.classList.add("inCorrectWord");
        item.classList.remove("correctWord");
      } else {
        item.classList.add("correctWord");
        item.classList.remove("inCorrectWord");
      }
    });

    if (isCorrect) {
      setNextPuzzleEnabled(true);
      setIsCheckEnabled(false);
      setIsAutoComplete(true);
    } else {
      setNextPuzzleEnabled(false);
    }
  };

  const handleAutoComplete = () => {
    if (observerRef.current) observerRef.current.disconnect();

    const words = currentSentence.textExample.split(" ");
    const gameBoardItem = gameBoardRef.current.querySelector(
      ".gameBoardItem.active "
    );
    const gameBoardItems = gameBoardRef.current.querySelectorAll(
      ".gameBoardItem.active .gameBoardItemWord"
    );

    if (gameBoardItem) {
      gameBoardItem.classList.remove("active");
      gameBoardItem.classList.add("disabled");
    }

    gameBoardItems.forEach((item, index) => {
      const span = document.createElement("span");
      span.innerText = words[index];
      item.innerHTML = "";
      item.appendChild(span);
    });

    const puzzleItems = document.querySelectorAll(".puzzleItem");
    puzzleItems.forEach((item) => {
      item.innerHTML = "";
    });

    setIsAutoComplete(false);
    setIsCheckEnabled(false);
    setNextPuzzleEnabled(true);

    setTimeout(() => {
      if (observerRef.current && gameBoardRef.current) {
        observerRef.current.observe(gameBoardRef.current, {
          childList: true,
          subtree: true,
        });
      }
    }, 0);
  };

  const handlerNextPuzzle = () => {
    setIsCheckEnabled(false);
    setIsAutoComplete(true);
    setNextPuzzleEnabled(false);
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
    <div className="main-page-container">
      {!showPainting && <GameHint />}
      <div ref={gameBoardRef}>
        <GameBoard key={`game-${currentPage}`} showPainting={showPainting} />:
      </div>
      {!showPainting && <PuzzleBoard key={`puzzle-${currentPage}`} />}
      {showPainting && <PaintingInfo />}
      <div className="puzzlesBoardBtns">
        {showPainting && !nextPuzzleEnabled ? (
          <>
            <Button
              type="button"
              child="results"
              classes={`btn-header`}
              // onClick={}
            />
            <Button
              type="button"
              child="next round"
              classes={`btn-header`}
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
              disabled={!isAutoComplete}
              classes={`btn-header ${!isAutoComplete ? "disabled" : ""}`}
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
    </div>
  );
};

export default MainPage;
