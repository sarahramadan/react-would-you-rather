import React, { Component } from 'react'
import { BrowserRouter as Router ,Route} from "react-router-dom";
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import SignIn from './components/SignIn';
import Header from './components/Header';
import PollDetails from './components/PollDetails';
import LeaderBoard from './components/LeaderBoard';
import LoadingBar from 'react-redux-loading'
import Fragment from 'render-fragment';
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Header />
          {this.props.loggedOut ? <SignIn />
            : 
            <div>
               <Fragment>
                  <Route path='/' exact  component={Home} />
                  <Route path='/questions/:id' component={PollDetails} />
                  <Route path='/add' component={NewQuestion} />   
                  <Route path='/leaderboard' component={LeaderBoard} />    
                </Fragment>
            </div>
          }

        </Fragment>
      </Router>

    )
  }
}
function mapStateToProps({authedUser}) {
  return {
    loggedOut: authedUser === null || authedUser=== '' || authedUser===undefined
  } 
}
export default connect(mapStateToProps)(App)