import { useContext, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../../components/button/button";
import GameBoard from "../../components/game-board/game-board";
import GameHint from "../../components/game-hint/game-hint";
import PuzzleBoard from "../../components/puzzle-board/puzzle-board";
import "./main-page.css";
import PaintingInfo from "../../components/painting-info/painting-info";
import GameBtnController from "../../components/game-btn-controller/game-btn-controller";

const MainPage = () => {
  const { currentPage } = useContext(PuzzleContext);
  const [showPainting, setShowPainting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="main-page-container">
      {!showPainting && <GameHint />}
      <GameBoard
        key={`game-${currentPage}`}
        showPainting={showPainting}
        isChecked={isChecked}
      />
      {!showPainting && <PuzzleBoard key={`puzzle-${currentPage}`} />}
      {showPainting && <PaintingInfo />}

      <GameBtnController
        setShowPainting={setShowPainting}
        setIsChecked={setIsChecked}
        showPainting={showPainting}
      />
    </div>
  );
};

export default MainPage;
