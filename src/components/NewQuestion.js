import { Component } from "react";
import { connect } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import { handleAddNewQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'
class NewQuestion extends Component {
    state = {
        choice1: '',
        choice2: '',
        toHome: false
    };
    submitNewQuestion(e){
        e.preventDefault()
        const { choice1, choice2 } = this.state;
        const { dispatch, authedUser } = this.props;
        dispatch(handleAddNewQuestion(choice1, choice2,authedUser))
        this.setState({ toHome: true })
    }
    setChoice1(e){
        e.preventDefault()
        this.setState({
            choice1 : e.target.value
          })
    }
    setChoice2(e){
        e.preventDefault()
        this.setState({
            choice2 : e.target.value
          })
    }
    render() {
        const { choice1, choice2 ,toHome} = this.state;
        if (toHome) {
            return <Redirect to='/' />
          }
        return (
                <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">Create New Question</h4>
                            </div>
                            <div className="card-body row">
                                <h1>Would you rather</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <input type="text" className="form-control" name="choice1" value={choice1} onChange={(e) => { this.setChoice1(e) }}
                                        placeholder="Enter option one text here" />
                                    </Form.Group>
                                        <p>---------------------------------------OR---------------------------------------</p>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <input type="text" className="form-control" name="choice1" value={choice2} onChange={(e) => { this.setChoice2(e) }}
                                        placeholder="Enter option two text here" />
                                    </Form.Group>
                                    <Button variant="outline-info" className="col-12" type="submit"  disabled={choice1 === '' || choice2 === ''} onClick={(e)=>{this.submitNewQuestion(e)}}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>        
        )
    }
}
function mapStateToProps({ users, questions, authedUser }) {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(NewQuestion)