import { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import PuzzleApi from "../../server/puzzleApi";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import "./level-page.css";

const LevelPage = () => {
  const { roundsCount, level, currentPage, allRounds, dispatch } =
    useContext(PuzzleContext);
  const [selectedLevel, setSelectedLevel] = useState(level);
  const [displayedRounds, setDisplayedRounds] = useState(allRounds);
  const [selectedRoundsCount, setSelectedRoundsCount] = useState(roundsCount);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLevelData = async () => {
      setIsLoading(true);
      if (selectedLevel === level) {
        setDisplayedRounds(allRounds);
        setSelectedRoundsCount(roundsCount);
      } else {
        const { data, success } = await PuzzleApi.getPuzzles(selectedLevel);
        if (success) {
          setDisplayedRounds(data.rounds);
          setSelectedRoundsCount(data.roundsCount);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadLevelData();
  }, [selectedLevel, level, allRounds, roundsCount]);

  const handleLevelClick = (clickedLevel) => {
    setSelectedLevel(clickedLevel);
  };
  const handlePictureClick = (selectedLevel, selectedRound) => {
    dispatch({
      type: "SET_NEW_LEVEL_DATA",
      payload: {
        level: selectedLevel,
        page: selectedRound,
        roundsCount: selectedRoundsCount,
      },
    });

    navigate("/puzzle-game");
  };

  return (
    <div className="level-container">
      <div className="levels">
        {[1, 2, 3, 4, 5, 6].map((lvl) => (
          <Button
            key={lvl}
            classes={selectedLevel === lvl ? "active" : ""}
            type="button"
            child={`level ${lvl}`}
            onClick={() => handleLevelClick(lvl)}
          />
        ))}
      </div>

      <div className="level-info">
        <div>Current Level: {level}</div>
        <div>Current Round: {currentPage + 1}</div>
        <div>Total Rounds: {roundsCount}</div>
        {selectedLevel !== level && (
          <div className="level-info__selected">
            <div>Selected Level: {selectedLevel}</div>
            <div>Selected Level Total Rounds: {selectedRoundsCount}</div>
          </div>
        )}
      </div>

      <div className="card-container">
        {isLoading ? (
          <Spinner />
        ) : (
          Array.isArray(displayedRounds) &&
          displayedRounds.map((round, index) => {
            const isPassed = selectedLevel === level && index <= currentPage;
            // const cardClass = `card text-bg ${isPassed ? "card--passed" : ""}`;
            const isActive = selectedLevel === level && index === currentPage;
            const cardClass = `card text-bg ${isPassed ? "card--passed" : ""} ${
              isActive ? "card--active" : ""
            }`;

            return (
              <div
                className="card-item"
                key={index}
                onClick={() => handlePictureClick(selectedLevel, index)}
              >
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
          })
        )}
      </div>
    </div>
  );
};

export default LevelPage;
