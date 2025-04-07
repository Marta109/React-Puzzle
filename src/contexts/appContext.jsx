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
  isAutoComplete: false,
};

function reducer(state, action) {
  let nextIndex, nextPage;
  switch (action.type) {
    case "DATA_RECEIVED": {
      const firstSentence = action.payload.rounds[0]?.words[0];
      const wordsArr = firstSentence.textExample.split(" ");
      const currentRoundWords = action.payload.rounds[0]?.words || [];

      const allSelectedWords = currentRoundWords.map((sentence) => {
        const length = sentence.textExample.split(" ").length;
        return new Array(length).fill(null);
      });

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
        sentenceArr: currentRoundWords,
        currentSentence: firstSentence,
        status: "ready",
        selectedWords: allSelectedWords,
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

      const updatedSelectedWords = [...state.selectedWords];

      updatedSelectedWords[state.currentRound + 1] = new Array(
        wordsNext.length
      ).fill(null);

      return {
        ...state,
        currentRound: nextIndex,
        currentSentence: nextSentence,
        selectedWords: updatedSelectedWords,
        availableWords: nextAvailableWords,
        isAutoComplete: false,
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
        selectedWords: state.selectedWords,
        availableWords: availableWordsNextRound,
        isAutoComplete: false,
      };
    }

    case "ADD_SELECTED_WORD": {
      const { word, stringArrLength, itemIndex } = action.payload;
      const wordObj = { word, stringArrLength, itemIndex };

      const { currentRound } = state;

      const currentRow = [...(state.selectedWords[currentRound] || [])];

      while (currentRow.length < stringArrLength) {
        currentRow.push(null);
      }

      const firstEmpty = currentRow.findIndex((w) => w === null);
      if (firstEmpty !== -1) {
        currentRow[firstEmpty] = wordObj;
      }

      const newSelectedWords = [...state.selectedWords];
      newSelectedWords[currentRound] = currentRow;

      return {
        ...state,
        selectedWords: newSelectedWords,
        availableWords: state.availableWords.filter(
          (w) => w.itemIndex !== itemIndex
        ),
      };
    }

    case "REMOVE_SELECTED_WORD": {
      const { indexToRemove, itemIndex } = action.payload;
      const { currentRound } = state;

      const selectedRow = state.selectedWords[currentRound];
      const wordObj = selectedRow?.[indexToRemove];

      if (!wordObj || wordObj.itemIndex !== itemIndex) return state;

      const newSelectedWords = [...state.selectedWords];
      const newRow = [...newSelectedWords[currentRound]];

      newRow[indexToRemove] = null;
      newSelectedWords[currentRound] = newRow;

      return {
        ...state,
        selectedWords: newSelectedWords,
        availableWords: [...state.availableWords, wordObj],
      };
    }

    case "FINISH_GAME":
      return {
        ...state,
        status: "finished",
      };
      
    case "UPDATE_SELECTED_WORDS": {
      const updatedSelectedWords = action.payload;

      if (!updatedSelectedWords || typeof updatedSelectedWords !== "object") {
        console.error("Invalid structure for updatedSelectedWords");
        return state;
      }

      return {
        ...state,
        selectedWords: updatedSelectedWords,
      };
    }

    case "AUTO_COMPLETE": {
      const roundIndex = state.currentPage;
      const sentenceIndex = state.currentRound;

      const correctWords = state.currentSentence.textExample.split(" ");
      const newSelectedWords = [...state.selectedWords];
      const newRow = correctWords.map((word) => ({
        word,
        isCorrect: true,
        isCompleted: true,
      }));

      newSelectedWords[roundIndex][sentenceIndex] = newRow;

      return {
        ...state,
        selectedWords: newSelectedWords,
        availableWords: [],
        isCompleted: true,
        isAutoComplete: true,
      };
    }
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
