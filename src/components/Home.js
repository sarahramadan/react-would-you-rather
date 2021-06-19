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
                             <HomeCard key={id} id={id} isAnswered={false}/>
                         ))}
                     </Tab>
                     <Tab eventKey="answered" title="Answered Poll">
                         {this.props.answeredQuestions.map((id) => (
                             <HomeCard key={id} id={id} isAnswered={true}/>
                         ))}
                     </Tab>

                 </Tabs>

             </div>
         )
     }
}
function mapStateToProps({users,questions,authedUser}) {
    const currentUser = users[authedUser];
    const answeredQuestions = Object.keys(currentUser.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    const unansweredQuestions = Object.keys(questions).filter(q => !answeredQuestions.includes(q))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    return {
        answeredQuestions,
        unansweredQuestions
    } 
}
export default connect(mapStateToProps)(Home)