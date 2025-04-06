import { createContext, useReducer, useEffect } from "react";
import PuzzleApi from "../server/puzzleApi";

const initialState = {
  status: "loading",
  level: 1,
  allRounds: [],
  currentRound: 0,
  currentPage: 0,
  sentenceArr: [],
  currentSentence: null,
  userName: "user",
  roundsCount: 0,
};

function reducer(state, action) {
  let nextIndex;
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        allRounds: action.payload.rounds,
        roundsCount: action.payload.roundsCount,
        levelData: action.payload.rounds[0]?.levelData,
        currentRound: 0,
        sentenceArr: action.payload.rounds[0]?.words || [],
        currentSentence: action.payload.rounds[0]?.words[0],
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
    case "NEXT_SENTENCE":
      nextIndex = state.currentRound + 1;
      return {
        ...state,
        currentRound: nextIndex,
        // levelData: state.allRounds[nextIndex]?.levelData || null,
        // sentenceArr: state.allRounds[nextIndex]?.words || [],
        currentSentence: state.sentenceArr[nextIndex],
      };
    case "NEXT_ROUND":
      nextIndex = state.currentRound + 1;
      return {
        ...state,
        currentRound: nextIndex,
        // levelData: state.allRounds[nextIndex]?.levelData || null,
        sentenceArr: state.allRounds[nextIndex]?.words || [],
        currentSentence: state.allRounds[nextIndex]?.words[0] || "",
      };
    // case "NEXT_WORD":
    //   return {
    //     ...state,
    //     currentWordIndex: state.currentWordIndex + 1,
    //     currentSentence: state.sentenceArr[state.currentWordIndex] || "",
    //   };
    case "FINISH_GAME":
      return {
        ...state,
        status: "finished",
      };
    case "PLAY_AGAIN":
      return {
        ...initialState,
        allRounds: state.allRounds,
        levelData: state.allRounds[0]?.levelData,
        sentenceArr: state.allRounds[0]?.words || [],
        currentSentence: state.allRounds[0]?.words[0] || "",
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
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      dispatch({ type: "START_GAME", payload: savedUserName });
    }

    PuzzleApi.getPuzzles(state.level).then((response) => {
      if (response.success) {
        dispatch({
          type: "DATA_RECEIVED",
          payload: {
            rounds: response.data.rounds,
            roundsCount: response.data.roundsCount,
          },
        });
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
