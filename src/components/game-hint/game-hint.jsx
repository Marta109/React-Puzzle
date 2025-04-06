import { useState, useContext, useRef } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../button/button";
import "./game-hint.css";

const GameHint = () => {
  const { currentSentence, level, roundsCount, currentPage, levelData } =
    useContext(PuzzleContext);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(null);

  if (!currentSentence?.textExampleTranslate || !currentSentence?.audioExample)
    return null;

  const toggleHintVisibility = () => {
    setIsHintVisible((prevState) => !prevState);
  };

  const handelSound = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlay(false);
    } else {
      const audio = new Audio(
        `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentSentence.audioExample}`
      );
      audioRef.current = audio;
      audio.play();
      setIsPlay(true);
    }
  };

  return (
    <>
      <div className="hint-title">
        <div className="">Level - {level}</div>
        <div className="">
          {" "}
          Round - {currentPage + 1} / {roundsCount}
        </div>
        <div className="painting-name">Painting: -"{levelData.name}"</div>
      </div>
      <div className="hint-container">
        <div className="showHint">
          <div className="hint-items" onClick={toggleHintVisibility}>
            <span style={{ "--i": 1 }}>H</span>
            <span style={{ "--i": 2 }}>I</span>
            <span style={{ "--i": 3 }}>N</span>
            <span style={{ "--i": 4 }}>T</span>
          </div>
        </div>
        <Button
          type="button"
          child={
            isPlay ? (
              <i className="fa-solid fa-volume-high"></i>
            ) : (
              <i className="fa-solid fa-volume-down"></i>
            )
          }
          onClick={handelSound}
          classes="btn-header sound"
        />
      </div>
      {isHintVisible && (
        <div className="hint">{currentSentence.textExampleTranslate}</div>
      )}
    </>
  );
};

export default GameHint;
