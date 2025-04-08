import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // document.body.style.overflow = "hidden";
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(false);
      document.body.style.overflow = "";
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isRunning && <ReactConfetti width={size.width} height={size.height} />}
    </>
  );
};

export default Confetti;
