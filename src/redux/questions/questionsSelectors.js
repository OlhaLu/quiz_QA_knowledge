const getQuestionNumber = state => state.questions.questionNumber;
const getQuestions = state => state.questions && state.questions.questions;
const getResult = state => state.questions.resultTest;
const getIsResultSended = state => state.questions.isResultSended;

export const getFinishedResults = state => state.questions.finished;

export const getResults = state => state.questions.result;

export const getResultsById = (state, examId) => {
  const results = getResults(state);
  return results.map(result => result.id === examId);
};

const getError = state => state.questions.error;

export default {
  getQuestionNumber,
  getQuestions,
  getResult,
  getIsResultSended,
  getError,
};
