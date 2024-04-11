import { string, object, number, ObjectSchema } from "yup";
import { SelectedPreference } from "../types";

export const preferenceSchema: ObjectSchema<SelectedPreference> = object({
  codingExperience: string().required("Coding experience is required"),
  algoExperience: string().required("Algorithm experience is required"),
  difficulty: string().required("Difficulty is required"),
  language: string().required("Language is required"),
  time: number().required().min(0).max(60),
});
