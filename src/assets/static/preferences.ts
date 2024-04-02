import {PreferenceItem, SuggestionItem} from "../../types";
import languages from "./language";
export const preferences: PreferenceItem[] = [
  {
    question: "What is your programming experience?",
    options: [
      "Entry level",
      "Intermediate",
      "Experienced"
    ],
  },
  {
    question: "What is your algorithm coding experience?",
    options: [
      "Entry level",
      "Intermediate",
      "Experienced"
    ],
  },
  {
    question: "Which is your most familiar programming language?",
    options: Array.from(languages.values()),
  },
]

export const suggestions: SuggestionItem[] = [
  {
    suggestion: "Question difficulty",
    value: "Easy",
  },
  {
    suggestion: "Coding time",
    value: 20,
  },
]