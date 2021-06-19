import { Component } from "react";
import { connect } from 'react-redux'
import { Button} from 'react-bootstrap'
import { setAuthedUser } from "./../actions/authedUser";
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {id: null};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({id: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.id))
      }
    render() {
        const { users } = this.props;
        return (
                <div className="d-flex justify-content-center p-3 col-8 mx-auto">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">Welcome to would you rather</h4>
                            </div>
                        <div className="card-body">
                            <h1>Please sign in to continue</h1>
                            <select className="form-select" value={this.state.value} onChange={this.handleChange} >
                            <option value={null} selected  disabled>Select user</option>
                                {Object.keys(users).map(u =>
                                    <option key={u} value={u}>
                                        {users[u].name}
                                    </option>)
                                }
                              
                                {/* <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option> */}
                            </select>
                            <Button variant="outline-info" className="col-12 mt-3" type="submit" onClick={(e)=>{this.handleSubmit(e)}}>
                                Submit
                            </Button>
                        </div>
                        </div>
                    </div>
                </div>        
        )
    }
}
function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(SignIn)