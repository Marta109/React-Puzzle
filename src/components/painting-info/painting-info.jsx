import { useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import "./painting-info.css";

const PaintingInfo = () => {
  const { levelData } = useContext(PuzzleContext);
  return (
    <div className="painting-info hint">
      <a
        href={`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${levelData.imageSrc}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4 className="painting-name">Painting: "{levelData.name}"</h4>
      </a>
      <div>Artist: {levelData.author}</div>
      <div>Year: {levelData.year}</div>
    </div>
  );
};

export default PaintingInfo;
