import { useState } from "react";
import { NavLink } from "react-router";
import puzzleIcon from "../../assets/images/icons/puzzle.svg";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/puzzle-game">
            <img src={puzzleIcon} alt="puzzle icon" className="puzzle-icon" />
            English -Puzzle
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav w-100 d-flex justify-content-around">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/welcome">
                  Start
                  <i className="fa-solid fa-book-open header-icons"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/puzzle-game">
                  Game
                  <i className="fa-solid fa-puzzle-piece header-icons"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/levels">
                  Levels
                  <i className="fa-solid fa-list header-icons"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link memory-icon"
                  href="https://marta109.github.io/Memory-game/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Memory Game
                  <i className="fa-solid fa-gamepad header-icons memory-icon"></i>
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  LogOut
                  <i className="fa-solid fa-right-from-bracket header-icons"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
