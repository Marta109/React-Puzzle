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
      const allSelectedWords = action.payload.rounds.map((round) =>
        round.words.map((sentence) => {
          const length = sentence.textExample.split(" ").length;
          return new Array(length).fill(null);
        })
      );
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

      return {
        ...state,
        currentRound: nextIndex,
        currentSentence: nextSentence,
        // selectedWords: new Array(wordsNext.length).fill(null),
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
      const { word, stringArrLength, itemIndex, roundIndex, sentenceIndex } =
        action.payload;
      const wordObj = { word, stringArrLength, itemIndex };

      const newSelectedWords = [...state.selectedWords];
      const newRow = [...newSelectedWords[roundIndex][sentenceIndex]];
      const firstEmpty = newRow.findIndex((w) => w === null);

      if (firstEmpty !== -1) newRow[firstEmpty] = wordObj;

      newSelectedWords[roundIndex][sentenceIndex] = newRow;

      return {
        ...state,
        selectedWords: newSelectedWords,
        availableWords: state.availableWords.filter((w) => w.word !== word),
      };
    }

    case "REMOVE_SELECTED_WORD": {
      const { roundIndex, sentenceIndex, indexToRemove } = action.payload;

      const selectedRow = state.selectedWords[roundIndex][sentenceIndex];
      const wordObj = selectedRow[indexToRemove];

      if (!wordObj) return state;

      const newSelectedWords = [...state.selectedWords];
      const newRow = [...newSelectedWords[roundIndex][sentenceIndex]];
      newRow[indexToRemove] = null;
      newSelectedWords[roundIndex][sentenceIndex] = newRow;

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
    case "UPDATE_SELECTED_WORDS":
      return {
        ...state,
        selectedWords: action.payload,
      };
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
