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
  autoCompletedSentences: [],
  userCompletedSentences: [],
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

      const updatedUserCompleted = !state.isAutoComplete
        ? [
            ...state.userCompletedSentences,
            {
              audio: state.currentSentence.audioExample,
              sentence: state.currentSentence.textExample,
              translate: state.currentSentence.textExampleTranslate,
            },
          ]
        : state.userCompletedSentences;

      return {
        ...state,
        currentRound: nextIndex,
        currentSentence: nextSentence,
        selectedWords: updatedSelectedWords,
        availableWords: nextAvailableWords,
        isAutoComplete: false,
        userCompletedSentences: updatedUserCompleted,
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

      const currentRoundWords = state.allRounds[nextPage].words || [];
      const newSelectedWords = currentRoundWords.map((sentence) => {
        const length = sentence.textExample.split(" ").length;
        return new Array(length).fill(null);
      });

      return {
        ...state,
        currentPage: nextPage,
        currentRound: 0,
        levelData: state.allRounds[nextPage]?.levelData || null,
        sentenceArr: currentRoundWords,
        currentSentence: firstSentenceNextRound,
        selectedWords: newSelectedWords,
        availableWords: availableWordsNextRound,
        isAutoComplete: false,
        userCompletedSentences: [],
        autoCompletedSentences: [],
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
      const sentenceIndex = state.currentRound;
      const correctWords = state.currentSentence.textExample.split(" ");

      const newRow = correctWords.map((word, index) => ({
        word,
        isCorrect: true,
        isCompleted: true,
        stringArrLength: correctWords.length,
        autocompleted: true,
        itemIndex: index,
      }));

      const newSelectedWords = [...state.selectedWords];
      newSelectedWords[sentenceIndex] = newRow;

      const updatedAutoCompleted = [
        ...state.autoCompletedSentences,
        {
          audio: state.currentSentence.audioExample,
          sentence: state.currentSentence.textExample,
          translate: state.currentSentence.textExampleTranslate,
        },
      ];

      return {
        ...state,
        selectedWords: newSelectedWords,
        availableWords: [],
        isCompleted: true,
        isAutoComplete: true,
        autoCompletedSentences: updatedAutoCompleted,
      };
    }

    case "SET_NEW_LEVEL_DATA": {
      const { level, page, roundsCount } = action.payload;

      const selectedRound = state.allRounds?.[page];
      if (!selectedRound) return state;

      const firstSentence = selectedRound.words?.[0];
      if (!firstSentence) return state;

      const wordsArr = firstSentence.textExample.split(" ");
      const availableWords = wordsArr.map((word, idx) => ({
        word,
        stringArrLength: wordsArr.length - 1,
        itemIndex: idx,
      }));

      const currentRoundWords = selectedRound.words;
      const allSelectedWords = currentRoundWords.map((sentence) => {
        const length = sentence.textExample.split(" ").length;
        return new Array(length).fill(null);
      });

      return {
        ...state,
        level,
        currentPage: page,
        currentRound: 0,
        levelData: selectedRound.levelData,
        sentenceArr: currentRoundWords,
        currentSentence: firstSentence,
        selectedWords: allSelectedWords,
        availableWords,
        isAutoComplete: false,
        autoCompletedSentences: [],
        userCompletedSentences: [],
        status: "ready",
        roundsCount: roundsCount,
      };
    }

    case "NEXT_LEVEL": {
      const newLevel = state.level + 1;

      return {
        ...state,
        level: newLevel,
        currentPage: 0,
        currentRound: 0,
        sentenceArr: [],
        selectedWords: [],
        availableWords: [],
        autoCompletedSentences: [],
        userCompletedSentences: [],
      };
    }

    default:
      throw new Error("Unknown action type");
  }
}

// eslint-disable-next-line react-refresh/only-export-components
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

        dispatch({
          type: "SET_NEW_LEVEL_DATA",
          payload: {
            level: state.level,
            page: state.currentPage || 0,
            roundsCount: response.data.roundsCount,
          },
        });
      } else {
        dispatch({ type: "DATA_FAILED" });
      }
    });
  }, [state.level, state.currentPage]);

  return (
    <PuzzleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PuzzleContext.Provider>
  );
}
