import { Component } from "react";
import { connect } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
class NewQuestion extends Component {

    render() {
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
                                        <Form.Control type="text" placeholder="Enter option one text here" />
                                    </Form.Group>
                                        <p>---------------------------------------OR---------------------------------------</p>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="text" placeholder="Enter option two text here" />

                                    </Form.Group>
                                    <Button variant="outline-info" className="col-12" type="submit">
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
    // const question = questions[id];
    // const author = question ?  users[question.author]: null ;

    return {
    }
}

export default connect(mapStateToProps)(NewQuestion)