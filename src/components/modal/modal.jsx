import { useContext, useState } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../button/button";

import Spinner from "../spinner/spinner";
import "./modal.css";

const Modal = ({ setShowModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("yy");
  const { levelData, level, roundsCount, currentPage } =
    useContext(PuzzleContext);

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
            {!data ? (
              <Spinner />
            ) : (
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
                    {/* <table className="table table-dark table-striped-columns table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Painting</th>
                          <td>"{levelData.name}"</td>
                        </tr>
                        <tr>
                          <th scope="row">Author</th>
                          <td>{levelData.author}</td>
                        </tr>
                        <tr>
                          <th scope="row">Year: </th>
                          <td>{levelData.year}</td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                  <div className="card">
                    <div className="card-body"></div>
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
            )}
          </div>
        </div>
      </div>

      {isOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Modal;
