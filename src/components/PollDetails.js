import { Component } from "react";
import { connect } from 'react-redux'
import { Form,Button,ProgressBar,Image} from 'react-bootstrap'
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
        const {isAnswerdQuestions,
            question,
            questionOwner,
            optionOneNumber,
            optionTwoNumber,
            totalOptionNumber,
            isAnswerdOptionOne} = this.props;
        const optionOneProgress = optionOneNumber/totalOptionNumber*100;
        const optionTwoProgress = optionTwoNumber/totalOptionNumber*100;
        const progressOptionOneInstance = (
            <ProgressBar now={optionOneProgress} label={`${optionOneProgress}%`} visuallyHidden />
        );
        const progressOptionTwoInstance = (
            <ProgressBar now={optionTwoProgress} label={`${optionTwoProgress}%`} visuallyHidden />
        );
        return (
            <div>

                {isAnswerdQuestions ? 
                                
                                <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                                <div className="card col-8 mt-10">
                                    <div className="card-horizontal">
                                        <div className="card-header">
                                            <h4 className="card-title">Added by {questionOwner.name}:</h4>
                                        </div>
                                        <div className="card-body row">
                                            <div className="img-square-wrapper col-4">
                                                <Image
                                                    src={questionOwner.avatarURL}
                                                    alt={`Avatar of${questionOwner.name}`}
                                                    className='col-4'
                                                />
                                            </div>
                                            <div className="float-left col-8">
                                                <h4 className="card-title">Result</h4>
                                                <div className="p-3 mb-2 bg-light">
                                           {isAnswerdOptionOne?
                                            <span className="badge bg-warning">Your vote</span>
                                            :
                                            null
                                           }
                                                   
                                                    <p>Would you rather be {question.optionOne.text}</p>
                                                    {progressOptionOneInstance}
                                                    <small className="text-muted">{optionOneNumber} out of {totalOptionNumber} votes</small>
                                                </div>
                                                <div className="p-3 mb-2 bg-light">
                                                {!isAnswerdOptionOne?
                                            <span className="badge bg-warning">Your vote</span>
                                            :
                                            null
                                           }
                                                    <p>Would you rather be {question.optionTwo.text}</p>
                                                    {progressOptionTwoInstance}
                                                    <small className="text-muted">{optionTwoNumber} out of {totalOptionNumber} votes</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
              :
              

               <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">User asks:</h4>
                            </div>
                            <div className="card-body row">
                                <h1>Would you rather</h1>
                                <Form>
                                        <div key={`default-radio`} className="mb-3">
                                            <Form.Check
                                                type='radio'
                                                id='default-radio'
                                                name="group1"
                                                label={`default radio`}
                                            />

                                            <Form.Check
                                                type='radio'
                                                id='default-radio'
                                                name="group1"
                                                label={`disabled-default-radio`}
                                            />
                                        </div>
                                        <Button variant="outline-info" className="col-12" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>  
                
                
            } 
          </div>
        )
    }
}
function mapStateToProps({users,questions,authedUser},props) {
    const { id } = props.match.params;
    const question =  questions[id];
    const currentUser =users[authedUser];
    let isAnswerdQuestions =  false;
    let questionOwner ;
    let totalOptionNumber =0;
    let optionOneNumber =0;
    let optionTwoNumber = 0;
    let isAnswerdOptionOne = false;
    if(currentUser){
        console.log( currentUser.answers[id]);
        isAnswerdQuestions = currentUser.answers[id] != null;   
        isAnswerdOptionOne  = currentUser.answers[id] == question.optionOne.text;
    }
    if(question){
        questionOwner = users[question.author];
        optionOneNumber = question.optionOne.votes.length;
        optionTwoNumber = question.optionTwo.votes.length;
        totalOptionNumber = optionOneNumber+optionTwoNumber;
    }
    return {
        isAnswerdQuestions,
        question,
        questionOwner,
        optionOneNumber,
        optionTwoNumber,
        totalOptionNumber,
        isAnswerdOptionOne
    } 
}

export default connect(mapStateToProps)(PollDetails)