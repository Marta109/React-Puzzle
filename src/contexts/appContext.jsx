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
  selectedWords: [],
  availableWords: [],
};

function reducer(state, action) {
  let nextIndex, nextPage;
  switch (action.type) {
    case "DATA_RECEIVED": {
      const firstSentence = action.payload.rounds[0]?.words[0];
      const wordsArr = firstSentence.textExample.split(" ");
      const availableWords = wordsArr.map((word, idx) => ({
        word,
        stringArrLength: wordsArr.length - 1,
        itemIndex: idx,
      }));
      return {
        ...state,
        allRounds: action.payload.rounds,
        roundsCount: action.payload.roundsCount,
        levelData: action.payload.rounds[0]?.levelData,
        currentRound: 0,
        sentenceArr: action.payload.rounds[0]?.words || [],
        currentSentence: firstSentence,
        status: "ready",
        selectedWords: new Array(wordsArr.length).fill(null),
        availableWords,
      };
    }
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
    case "NEXT_SENTENCE": {
      nextIndex = state.currentRound + 1;
      const nextSentence = state.sentenceArr[nextIndex];
      const wordsNext = nextSentence.textExample.split(" ");
      const nextAvailableWords = wordsNext.map((word, idx) => ({
        word,
        stringArrLength: wordsNext.length - 1,
        itemIndex: idx,
      }));

      return {
        ...state,
        currentRound: nextIndex,
        currentSentence: nextSentence,
        selectedWords: new Array(wordsNext.length).fill(null),
        availableWords: nextAvailableWords,
      };
    }

    case "NEXT_ROUND": {
      nextPage = state.currentPage + 1;
      nextIndex = 0;
      const firstSentenceNextRound = state.allRounds[nextPage].words[nextIndex];
      const wordsNextRound = firstSentenceNextRound.textExample.split(" ");
      const availableWordsNextRound = wordsNextRound.map((word, idx) => ({
        word,
        stringArrLength: wordsNextRound.length - 1,
        itemIndex: idx,
      }));

      return {
        ...state,
        currentPage: nextPage,
        currentRound: 0,
        levelData: state.allRounds[nextPage]?.levelData || null,
        sentenceArr: state.allRounds[nextPage].words || [],
        currentSentence: firstSentenceNextRound,
        selectedWords: new Array(wordsNextRound.length).fill(null),
        availableWords: availableWordsNextRound,
      };
    }

    // case "NEXT_WORD":
    //   return {
    //     ...state,
    //     currentWordIndex: state.currentWordIndex + 1,
    //     currentSentence: state.sentenceArr[state.currentWordIndex] || "",
    //   };
    case "ADD_SELECTED_WORD": {
      const { word, stringArrLength, itemIndex } = action.payload;

      const wordObj = { word, stringArrLength, itemIndex };

      const newSelected = [...state.selectedWords];
      const firstEmptyIndex = newSelected.findIndex((w) => w === null);

      if (firstEmptyIndex !== -1) {
        newSelected[firstEmptyIndex] = wordObj;
      }

      const newAvailable = state.availableWords.filter((w) => w.word !== word);

      return {
        ...state,
        selectedWords: newSelected,
        availableWords: newAvailable,
      };
    }

    case "REMOVE_SELECTED_WORD": {
      const { indexToRemove } = action.payload;
      const wordObj = state.selectedWords[indexToRemove];
      if (!wordObj) return state;

      const newSelected = [...state.selectedWords];
      newSelected[indexToRemove] = null;

      return {
        ...state,
        selectedWords: newSelected,
        availableWords: [...state.availableWords, wordObj],
      };
    }

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
