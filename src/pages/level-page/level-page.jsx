import { useContext, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../../components/button/button";
import "./level-page.css";

const LevelPage = () => {
  const { roundsCount, level, currentPage, allRounds } =
    useContext(PuzzleContext);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="level-container">
      <div className="levels">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Button
            key={level}
            classes={selectedLevel === level ? "active" : ""}
            type="button"
            child={`level ${level}`}
            onClick={() => handleLevelClick(level)}
          />
        ))}
      </div>

      <div className="level-info">
        <div>Current Level: {level}</div>
        <div>Total Rounds: {roundsCount}</div>
        <div>Current Round: {currentPage + 1}</div>
      </div>

      <div className="card-container">
        {allRounds.map((round, index) => {
          const isPassed = index <= currentPage;
          const cardClass = `card text-bg ${isPassed ? "card--passed" : ""}`;
          return (
            <div className="card-item" key={index}>
              <div className={cardClass}>
                <img
                  src={`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${round.levelData.cutSrc}`}
                  className="card-img item"
                  alt="picture"
                />
                <div className="card-img-overlay">
                  <div className="card-info">
                    <div className="painting-name card-title">
                      Painting: {round.levelData.name}
                    </div>
                    <div>Author: {round.levelData.author}</div>
                    <div>Year: {round.levelData.year}</div>
                    <div>Round: {index + 1}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelPage;
