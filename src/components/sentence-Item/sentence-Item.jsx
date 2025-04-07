import { useState, useRef } from "react";
import Button from "../button/button";
import "./sentence-item.css";

const SentenceItem = ({ sentence, audio, translate, index }) => {
  const [showTranslate, setShowTranslate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    const audioSrc = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audio}`;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;

    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    newAudio.play();
    setIsPlaying(true);
  };

  const toggleTranslate = () => {
    setShowTranslate((prev) => !prev);
  };

  return (
    <div className="sentence-item-all">
      <div className="sentence-item" onClick={toggleTranslate}>
        <div className="sentence-number">{index + 1}.</div>
        <div className="sentence-text">{sentence}</div>
        <Button
          child={
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          }
          type="button"
          classes="modal-btn watch"
          title={isPlaying ? "Pause sound" : "Play sound"}
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        />
      </div>
      <div
        className={`sentence-translate-wrapper ${showTranslate ? "show" : ""}`}
      >
        <div className="sentence-translate">{translate}</div>
      </div>
    </div>
  );
};

export default SentenceItem;
