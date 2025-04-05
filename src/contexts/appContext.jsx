import { createContext, useReducer, useEffect } from "react";
import PuzzleApi from "../server/puzzleApi";

const initialState = {
  status: "loading",
  level: 1,
  rounds: [],
  currentRoundIndex: 0,
  currentWordIndex: 0,
  currentImage: null,
  userName: localStorage.getItem("userName") || "user",
  score: 0,
  time: 0,
};

function reducer(state, action) {
  let nextIndex;
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        rounds: action.payload,
        currentImage: action.payload[0].levelData,
        status: "ready",
      };
    case "DATA_FAILED":
      return {
        ...state,
        status: "error",
      };
    case "START_GAME":
      return {
        ...state,
        userName: action.payload,
        status: "active",
      };
    case "NEXT_ROUND":
      nextIndex = state.currentRoundIndex + 1;
      return {
        ...state,
        currentRoundIndex: nextIndex,
        currentImage: state.rounds[nextIndex]?.levelData || null,
        currentWordIndex: 0,
      };
    case "NEXT_WORD":
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
      };
    case "FINISH_GAME":
      return {
        ...state,
        status: "finished",
      };
    case "PLAY_AGAIN":
      return {
        ...initialState,
        rounds: state.rounds,
        currentImage: state.rounds[0]?.levelData,
        status: "ready",
      };
    default:
      throw new Error("Unknown action type");
  }
}

export const PuzzleContext = createContext();

export function PuzzleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    PuzzleApi.getPuzzles(state.level).then((response) => {
      if (response.success) {
        dispatch({ type: "DATA_RECEIVED", payload: response.data.rounds });
      } else {
        dispatch({ type: "DATA_FAILED" });
      }
    });
  }, [state.level]);

  return (
    <PuzzleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PuzzleContext.Provider>
  );
}
