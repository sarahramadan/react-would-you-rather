import { getInitialData } from './../utils/api'
import { receiveUsers, addUserQuestionAnswer } from './../actions/users'
import { receiveQuestions ,addQuestionAnswer} from './../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer } from '../utils/api'

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