import { PreferenceItem, SuggestionItem } from "../../types";
import { languages } from "./language";
export const preferences: PreferenceItem[] = [
  {
    question: "What is your programming experience?",
    options: [
      "Entry level",
      "Intermediate",
      "Experienced"
    ],
    name: "codingExperience",
  },
  {
    question: "What is your algorithm coding experience?",
    options: [
      "Entry level",
      "Intermediate",
      "Experienced"
    ],
    name: "algoExperience",
  },
  {
    question: "Which is your most familiar programming language?",
    options: Array.from(languages.values()),
    name: "language",
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