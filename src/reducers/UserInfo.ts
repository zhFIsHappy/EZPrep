export type userAccountInfo = {
  email: string;
  password: string;
};

export type userCodingPreference = {
  programmingExp: string;
  codingExp: string;
  codingLang: string;
};

export type userSolvedQuestionsCount = {
  easy_finished: number;
  medium_finished: number;
  hard_finished: number;
  easy_total: number;
  medium_total: number;
  hard_total: number;
};
