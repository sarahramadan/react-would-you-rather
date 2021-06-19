import { Component } from "react";
import { connect } from 'react-redux'
import HomeCard from "./HomeCard";
import {  Tabs,Tab } from "react-bootstrap";
class Home extends Component{
     render (){
         return (
             <div>
                 <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                     <Tab eventKey="unanswered" title="Unanswered Poll">
                         {this.props.unansweredQuestions.map((id) => (
                             <HomeCard key={id} id={id}/>
                         ))}
                     </Tab>
                     <Tab eventKey="answered" title="Answered Poll">
                         {this.props.answeredQuestions.map((id) => (
                             <HomeCard key={id} id={id}/>
                         ))}
                     </Tab>

                 </Tabs>

             </div>
         )
     }
}
function mapStateToProps({users,questions,authedUser}) {
    const currentUser = users[authedUser];
    let answeredQuestions = [];
    let unansweredQuestions=[];
    if(currentUser){
         answeredQuestions = Object.keys(currentUser.answers)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
         unansweredQuestions = Object.keys(questions).filter(q => !answeredQuestions.includes(q))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }

    return {
        answeredQuestions,
        unansweredQuestions
    } 
}
export default connect(mapStateToProps)(Home)