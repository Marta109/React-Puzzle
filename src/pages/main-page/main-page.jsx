import GameBoard from "../../components/game-board/game-board";
import PuzzleBoard from "../../components/puzzle-board/puzzle-board";
import "./main-page.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <GameBoard />
      <PuzzleBoard />
    </div>
  );
};

export default MainPage;
