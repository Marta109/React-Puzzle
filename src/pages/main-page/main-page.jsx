import { useContext, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../../components/button/button";
import GameBoard from "../../components/game-board/game-board";
import GameHint from "../../components/game-hint/game-hint";
import PuzzleBoard from "../../components/puzzle-board/puzzle-board";
import "./main-page.css";
import PaintingInfo from "../../components/painting-info/painting-info";
import GameBtnController from "../../components/game-btn-controller/game-btn-controller";
import Modal from "../../components/modal/modal";
import FinishScreen from "../../components/finish-screen/finish-screen";

const MainPage = () => {
  const { currentPage } = useContext(PuzzleContext);
  const [showPainting, setShowPainting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);

  if (showFinishScreen) {
    return <FinishScreen />;
  }

  return (
    <div className="main-page-container">
      {!showPainting && <GameHint />}
      {showModal && <Modal setShowModal={setShowModal} />}
      <GameBoard
        key={`game-${currentPage}`}
        showPainting={showPainting}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {showPainting && <PaintingInfo />}
      {!showPainting && <PuzzleBoard key={`puzzle-${currentPage}`} />}

      <GameBtnController
        setShowPainting={setShowPainting}
        setIsChecked={setIsChecked}
        showPainting={showPainting}
        setShowModal={setShowModal}
        setShowFinishScreen={setShowFinishScreen}
      />
    </div>
  );
};

export default MainPage;
