import { Component } from "react";
import { connect } from 'react-redux'
import { Form,Button,ProgressBar,Image} from 'react-bootstrap'
import {handleSaveQuestionAnswer} from './../actions/shared'
import { Redirect } from 'react-router-dom'

class PollDetails extends Component {
    state = { answerOption: null , toHome: false };
    // constructor(props) {
    //     super(props);
   
    //     this.addUserAnswer = this.addUserAnswer.bind(this);
    //     this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    // }
    handleSelectAnswer(e) {
        this.setState({ answerOption: e.target.value , toHome: false });
    }
    addUserAnswer = (e) => {
        e.preventDefault()
        const { dispatch, question, authedUser } = this.props;
        dispatch(handleSaveQuestionAnswer({
            authedUser: authedUser,
            qid: question.id,
            answer: this.state.answerOption
        }))
        this.setState({toHome: true });
    }
    render() {
        const {        
            isAnswerdQuestions,
            question,
            questionOwner,
            optionOneNumber,
            optionTwoNumber,
            totalOptionNumber,
            isAnswerdOptionOne} = this.props;
        const { answerOption,toHome } = this.state;
        const optionOneProgress = optionOneNumber/totalOptionNumber*100;
        const optionTwoProgress = optionTwoNumber/totalOptionNumber*100;
        const progressOptionOneInstance = (
            <ProgressBar now={optionOneProgress} label={`${optionOneProgress}%`}  />
        );
        const progressOptionTwoInstance = (
            <ProgressBar now={optionTwoProgress} label={`${optionTwoProgress}%`}  />
        );
        if (toHome === true) {
            return <Redirect to='/' />
        }
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
                                                   
                                                    <p>Would You Rather {question.optionOne.text}</p>
                                                    {progressOptionOneInstance}
                                                    <small className="text-muted">{optionOneNumber} out of {totalOptionNumber} votes</small>
                                                </div>
                                                <div className="p-3 mb-2 bg-light">
                                                {!isAnswerdOptionOne?
                                            <span className="badge bg-warning">Your vote</span>
                                            :
                                            null
                                           }
                                                    <p>Would You Rather {question.optionTwo.text}</p>
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
                                    <h4 className="card-title">{questionOwner.name} asks:</h4>
                            </div>
                            <div className="card-body row">
                                <h1>Would you rather</h1>
                                <Form>
                                        <div key={`default-radio`} className="mb-3">
                                            <Form.Check
                                                type='radio'
                                                id={question.optionOne.text}
                                                name="group1"
                                                label={question.optionOne.text}
                                                value='optionOne'
                                                onChange={(e)=>{this.handleSelectAnswer(e)}}
                                            />

                                            <Form.Check
                                                type='radio'
                                                id={question.optionTwo.text}
                                                name="group1"
                                                label={question.optionTwo.text}
                                                value='optionTwo'
                                                onChange={(e)=>{this.handleSelectAnswer(e)}}
                                            />
                                        </div>
                                        <Button variant="outline-info" className="col-12" type="submit" disabled={answerOption === ''} onClick={(e)=>{this.addUserAnswer(e)}}>
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
        if(currentUser.answers[id]){
            isAnswerdQuestions = true;
        }
       // isAnswerdQuestions = !(currentUser.answers[id] === null || currentUser.answers[id] === undefined);   
        isAnswerdOptionOne  = currentUser.answers[id] === 'optionOne';
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
        isAnswerdOptionOne,
        authedUser
    } 
}

export default connect(mapStateToProps)(PollDetails)