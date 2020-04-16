import { connect } from 'react-redux'
import React from 'react';
import { createUser } from './signup_actions'

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = props.user
    }

    emailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    nameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    usernameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    signup = (e) => {
        const user = {
            email: this.state.email,
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
        }
        this.props.signupUser(user)
    }

    render() {
        return (
            <div>
                <h1>Store State "{this.props.user.name} {this.props.user.username} {this.props.user.email} {this.props.user.password}"</h1>

                <input type="text" value={this.state.email} onChange={this.emailChange} />
                <input type="text" value={this.state.name} onChange={this.nameChange} />
                <input type="text" value={this.state.username} onChange={this.usernameChange} />
                <input type="text" value={this.state.password} onChange={this.passwordChange} />

                <button onClick={this.signup}>Sign-up</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.signupReducer.newUser
});


const mapDispatchToProps = dispatch => ({
    signupUser: user => dispatch(createUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
