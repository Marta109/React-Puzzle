import Button from "../../components/button/button";
import GameBoard from "../../components/game-board/game-board";
import GameHint from "../../components/game-hint/game-hint";
import PuzzleBoard from "../../components/puzzle-board/puzzle-board";
import "./main-page.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <GameHint />
      <GameBoard />
      <PuzzleBoard />
      <div className="puzzlesBoardBtns">
        <Button
          type="button"
          child="Check"
          // onClick={handelSound}
          classes="btn-header"
        />
        <Button
          type="button"
          child="Auto Complete"
          // onClick={handelSound}
          classes="btn-header"
        />
        <Button
          type="button"
          child="next puzzle"
          // onClick={handelSound}
          classes=" btn-header"
        />
      </div>
    </div>
  );
};

export default MainPage;
