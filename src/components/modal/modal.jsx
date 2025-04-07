import { useContext, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../button/button";
import SentenceItem from "../sentence-item/sentence-item";
import "./modal.css";

const Modal = ({ setShowModal }) => {
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const {
    levelData,
    level,
    roundsCount,
    currentPage,
    autoCompletedSentences,
    userCompletedSentences,
  } = useContext(PuzzleContext);

  const closeModal = () => {
    document.body.style.overflow = "";
    setShowModal(false);
  };

  const closeModalOnBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div className="app-modal">
      <div
        className={`modal ${isOpen ? "show d-block" : "d-none"}`}
        tabIndex="-1"
        onClick={closeModalOnBackdropClick}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <>
              <div className="modal-header">
                <h4 className="modal-title">
                  {levelData.name} - ({levelData.year})
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div class="movie-details-container">
                  <img
                    class="img-fluid"
                    alt="poster"
                    src={`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc}`}
                  />
                  <div className="painting-info">
                    <div className="level-info">
                      <div className="">Level - {level}</div>
                      <div className="">
                        {" "}
                        Round - {currentPage + 1} / {roundsCount}
                      </div>
                    </div>
                    <a
                      href={`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h4 className="painting-name">
                        Painting: "{levelData.name}"
                      </h4>
                    </a>
                    <div>Artist: {levelData.author}</div>
                    <div>Year: {levelData.year}</div>
                    <a
                      href={`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h6 className="painting-name open">
                        Open painting in new tab
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div class="descr-item">
                      <h6>Autocompleted: I don't know </h6>
                      <div className="sentence-container">
                        {autoCompletedSentences.map((item, index) => (
                          <SentenceItem
                            key={index}
                            sentence={item.sentence}
                            audio={item.audio}
                            translate={item.translate || "—"}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="descr-item">
                      <h6>I know</h6>
                      <div className="sentence-container">
                        {userCompletedSentences.length > 0 ? (
                          userCompletedSentences.map((item, index) => (
                            <SentenceItem
                              key={index}
                              sentence={item.sentence}
                              audio={item.audio}
                              translate={item.translate || "—"}
                              index={index}
                            />
                          ))
                        ) : (
                          <div className="encouragement-message">
                            <p>
                              It looks like all sentences were completed
                              automatically. Try harder next time — you've got
                              this! 💪
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  child="close"
                  type="button"
                  onClick={closeModal}
                  classes="modal-btn"
                />
              </div>
            </>
          </div>
        </div>
      </div>

      {isOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Modal;
