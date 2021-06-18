import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import SignIn from './components/SignIn';
import PollDetails from './components/PollDetails';
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loggedOut? null 
        : <PollDetails />
        }
        
      </div>
    )
  }
}
function mapStateToProps({authedUser}) {
  return {
      loggedOut: authedUser == null
  } 
}
export default connect(mapStateToProps)(App)