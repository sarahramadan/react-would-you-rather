import { Component } from "react";
import { connect } from 'react-redux'
import { Button} from 'react-bootstrap'
class SignIn extends Component {

    render() {
        return (
                <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">Welcome to would you rather</h4>
                            </div>
                        <div className="card-body">
                            <h1>Please sign in to continue</h1>
                            <select className="form-select" >
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>
                            <Button variant="outline-info" className="col-12 mt-3" type="submit">
                                Submit
                                    </Button>
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

export default connect(mapStateToProps)(SignIn)