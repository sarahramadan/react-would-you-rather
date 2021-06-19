import { Component } from "react";
import { connect } from 'react-redux'
import { Navbar,Button,Nav,Image } from 'react-bootstrap'
import { logoutUsers } from './../actions/authedUser'

class Header extends Component {
    submitLogoutUser(e){
        debugger;
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(logoutUsers())
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/add">New Question</Nav.Link>
                    <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
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
        loggedOut: authedUser == null
    }
}

export default connect(mapStateToProps)(Header)