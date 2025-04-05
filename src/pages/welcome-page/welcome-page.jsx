import { useEffect, useState, useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import "./welcome.css";

const WelcomePage = () => {
  const { userName } = useContext(PuzzleContext);
  const [hideWelcome, setHideWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideWelcome(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = () => {
    navigate("/puzzle-game");
  };

  return (
    <div className="welcome-container">
      <h2 className={`welcome-user ${hideWelcome ? "hidden" : ""}`}>
        Welcome, {userName}!
      </h2>
      <div className="welcome">
        <h1 className="game-title">PUZZLE GAME</h1>
        <div className="game-descr">
          Welcome to Puzzle - an exciting game where you can not only learn
          English but also immerse yourself in the world of art through
          captivating puzzles. Each level of Puzzle features a new painting or
          drawing that you piece together. As you progress, you'll learn new
          words and phrases in English related to the theme of the image. Not
          only do you learn the pronunciation of English words, but you also
          enjoy the beauty of art by assembling puzzles and learning more about
          each piece.Are you ready for an engaging journey into the world of
          language and beauty with Puzzle? <br /> Start playing now Ready to
          start🌠?
          <br />
        </div>
        <Button child={"start game"} type="button" onClick={handleStartGame} />
      </div>
    </div>
  );
};

export default WelcomePage;
