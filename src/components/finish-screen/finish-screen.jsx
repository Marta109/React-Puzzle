import Confetti from "../confetti/confetti";
import "./finish-screen.css";

const FinishScreen = () => {
  return (
    <div className="finish-screen">
      <Confetti />
      <h1>🎉 Congratulations! 🎉</h1>
      <p>You've completed the final puzzle!</p>
      <p>
        Throughout this journey, you’ve learned{" "}
        <strong>3,600 English words</strong> — with audio, translations, and
        context. But that's not all! You’ve also discovered amazing works of
        art, explored the stories behind them, and learned about famous artists
        and their masterpieces.
      </p>
      <p>
        You've completed <strong> 6 levels </strong> and a total of{" "}
        <strong> 209 rounds. </strong> Amazing job!
      </p>
      <p>
        From stunning landscapes to thought-provoking portraits, you’ve
        encountered iconic paintings, learned when they were created, and who
        painted them. You’ve gained not only language skills, but a deeper
        appreciation for art and its history.
      </p>
      <p>
        Well done! You’ve completed a big challenge and learned so much along
        the way. Keep going — your language journey has only just begun!
      </p>
    </div>
  );
};

export default FinishScreen;
