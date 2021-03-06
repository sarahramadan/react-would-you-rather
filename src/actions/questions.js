
export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER='ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }

}

// action for add user answer for a question
export function addQuestionAnswer(authedUser, qid, answer){
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion (question) {
    return {
      type: ADD_QUESTION,
      question
    }
  }
