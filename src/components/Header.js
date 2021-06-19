import { Component } from "react";
import { connect } from 'react-redux'
import { Navbar,Button,Nav,Image } from 'react-bootstrap'
import { logoutUsers } from './../actions/authedUser'
import { Redirect,Link } from 'react-router-dom'
class Header extends Component {
    submitLogoutUser(e){
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(logoutUsers())
        return <Redirect to='/' />
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Nav className="me-auto">
                    <Link to="/" className="header-nav">Home</Link>
                    <Link to="/add"  className="header-nav">New Question</Link>
                    <Link to="/leaderboard"  className="header-nav">Leader Board</Link>
                </Nav>
                <Navbar.Toggle />
                {this.props.loggedOut ? null :
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.props.currentUser.name}
                        </Navbar.Text>
                            <Image src={this.props.currentUser.avatarURL} roundedCircle className="avatar-image" />
                        <Button variant="outline-danger" onClick={(e)=>{this.submitLogoutUser(e)}}>Logout</Button>
                    </Navbar.Collapse>
                }
            </Navbar>
        )
    }
}
function mapStateToProps({ users, authedUser }) {
   const currentUser = users[authedUser];
    return {
        currentUser,
        loggedOut: authedUser === null || authedUser=== '' || authedUser===undefined
    }
}

export default connect(mapStateToProps)(Header)