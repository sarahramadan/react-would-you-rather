import { Component } from "react";
import { connect } from 'react-redux'
import {handleSaveQuestionAnswer} from './../actions/questions'

class PollDetails extends Component {
    addUserAnswer = (e,answer) => {
        e.preventDefault()
        const { dispatch, question, authedUser } = this.props

        dispatch(handleSaveQuestionAnswer({ 
            authedUser: authedUser,
             qid:question.id,
              answer }))
    }
    render() {
        return (
            <div>
              Details
            </div>

        )
    }
}
function mapStateToProps({users,questions,authedUser}) {
    // const question = questions[id];
    // const author = question ?  users[question.author]: null ;

    return {
    } 
}

export default connect(mapStateToProps)(PollDetails)