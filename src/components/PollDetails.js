import { Component } from "react";
import { connect } from 'react-redux'
import { Form,Button,ProgressBar,Image,Badge} from 'react-bootstrap'
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
        const now = 60;
        const remain = 40;
const progressOptionOneInstance = (
  <ProgressBar now={now} label={`${now}%`} visuallyHidden />
);
const progressOptionTwoInstance = (
    <ProgressBar now={remain} label={`${remain}%`} visuallyHidden />
  );
        return (
            <div>
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
                <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">Added by user:</h4>
                            </div>
                            <div className="card-body row">
                                <div className="img-square-wrapper col-4">
                                    <Image
                                        src="https://tylermcginnis.com/would-you-rather/tyler.jpg"
                                        alt={`Avatar of`}
                                        className='col-4'
                                    />
                                </div>
                                <div className="float-left col-8">
                                    <h4 className="card-title">Result</h4>
                                    <div className="p-3 mb-2 bg-light">
                                        <span class="badge bg-warning">Your vote</span>
                                        <p>Would you rather be---------</p>
                                        {progressOptionOneInstance}
                                        <small class="text-muted">4 out of6 votes</small>
                                    </div>
                                    <div className="p-3 mb-2 bg-light">
                                        <p>Would you rather be---------</p>
                                        {progressOptionTwoInstance}
                                        <small class="text-muted">2 out of 6 votes</small>
                                    </div>
                                </div>
                           

                            </div>
                        </div>
                    </div>
                </div>  
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