import { Component } from "react";
import { connect } from 'react-redux'
import {  Image } from "react-bootstrap";
import {formatLeaderBoard} from './../utils/helper'

class LeaderBoard extends Component{
     render (){
         const { users} =this.props;
         return (
             <div>
                 {users.map((u,i)=>(
                     <div className="d-flex justify-content-center p-3" key={u.id}>
                         <div className="card col-8 mt-10">
                             <div className="card-horizontal">
                                 <div className="card-header">
                                                          
                                     <h4 className="card-title" key={u.id}>{i === 0 ? <span className="badge bg-warning">1</span> : null} {u.name}</h4>
                                 </div>
                                 <div className="card-body row">
                                     <div className="img-square-wrapper col-3">
                                         <Image
                                             src={u.avatarURL}
                                             alt={`Avatar of ${u.name}`}
                                             className='col-4'
                                         />
                                     </div>
                                     <div className="float-left col-6 vl">
                                         <h4 className="card-title">Answerd Question </h4>
                                         <p className="card-text">{u.answeredScore}</p>
                                         <h4 className="card-title">Created Question</h4>
                                         <p className="card-text">{u.questionScore}</p>
                                     </div>
                                     <div className="float-left col-3 vl">
                                         <h4 className="card-title">Score</h4>
                                         <p className="card-text">{u.score}</p>
                                     </div>

                                 </div>
                             </div>
                         </div>
                     </div>
                 ))}

             </div>
         )
     }
}
function mapStateToProps({users}) {
  return {
    users: formatLeaderBoard(users).sort((a,b)=> b.score - a.score)
  }
}
export default connect(mapStateToProps)(LeaderBoard)