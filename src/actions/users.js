export const RECEIVE_USERS='RECEIVE_USERS'
export const ADD_QUESTION_ANSWER='ADD_QUESTION_ANSWER'

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}
export function addUserQuestionAnswer(authedUser, qid, answer ){
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}
