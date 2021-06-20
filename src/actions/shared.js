import { getInitialData } from './../utils/api'
import { receiveUsers, addUserQuestionAnswer ,addUserQuestion} from './../actions/users'
import { receiveQuestions ,addQuestionAnswer,addQuestion} from './../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer } from '../utils/api'
import {  _saveQuestion } from '../utils/_DATA'
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}
export function handleSaveQuestionAnswer(info){
    return (dispatch)=>{
        const {authedUser,qid,answer}=info
      saveQuestionAnswer({
        authedUser,
        qid,
        answer
      }).then(()=>{
         dispatch(addQuestionAnswer(authedUser,qid,answer))
         dispatch(addUserQuestionAnswer(authedUser,qid,answer))
     })
         .catch((e) => {
         console.log('Error in handleSaveQuestionAnswer: ', e)
       })
    }
 }
 export function handleAddNewQuestion (optionOneText, optionTwoText,authedUser){
    return (dispatch) => {
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(authedUser, question.id))
        })
        .catch((e) => {
            console.log('Error in handleAddNewQuestion: ', e)
          })

    }
}