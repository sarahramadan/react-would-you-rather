import { Component } from "react";
import { connect } from 'react-redux'
import { Image,Button } from 'react-bootstrap'
import {formatQuestion} from './../utils/helper'
import {  withRouter } from 'react-router-dom';
class HomeCard extends Component {
    constuctor() {
        this.redirectToPollDetails = this.redirectToPollDetails.bind(this);
      }
    redirectToPollDetails(e, id) {
        e.preventDefault()
        const path=`/questions/${id}`
        this.props.history.push(path);
    }
    render() {
        const {question} = this.props;
        if(question == null){
            return <p> This question doesn't exist</p>
        }
        const { id,
            name,
            avatarURL,
            optionOne,
            optionTwo} = question
        return (
            <div>
                <div className="d-flex justify-content-center p-3">
                    <div className="card col-8 mt-10">
                        <div className="card-horizontal">
                            <div className="card-header">
                                    <h4 className="card-title">{name} asks:</h4>
                            </div>
                            <div className="card-body row">
                                <div className="img-square-wrapper col-4">
                                    <Image
                                        src={avatarURL}
                                        alt={`Avatar of ${name}`}
                                        className='col-4'
                                    />
                                </div>
                                <div className="float-left col-8">
                                    <h4 className="card-title">Would you rather</h4>
                                    <p className="card-text">{optionOne}</p>
                                    <h4 className="card-title">or</h4>
                                    <p className="card-text">{optionTwo}</p>
                                    <Button variant="outline-info" className="col-8" onClick={(e) => this.redirectToPollDetails(e, id)}>View Poll</Button>
                                </div>
                           

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps({users,questions},{id}) {
    const question = questions[id];
    const author = question ?  users[question.author]: null ;

    return {
        question: question ? formatQuestion(question,author): null
    } 
}
export default withRouter(connect(mapStateToProps)(HomeCard))