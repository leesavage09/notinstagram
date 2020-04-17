import { connect } from 'react-redux'
import React from 'react';
import { createUser } from './signup_actions'
import { errorTypes, loading, signedUpUser, errorsMessages } from './signup_selectors'

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            username: '',
            password: ''
        }
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
        // console.log("err types", this.props.errorTypes)

        const errorListItems = []
        this.props.errorsMessages.forEach( (message, idx) => {
            errorListItems.push(<li key={idx}>{message}</li>)
        });
        return (
            <div>
                <div className="logo" ></div>
                <h1>props "{this.props.user.name} {this.props.user.username} {this.props.user.email} {this.props.user.password}"</h1>

                <input type="text" placeholder='email' value={this.state.email} onChange={this.emailChange} />
                <input type="text" placeholder='name' value={this.state.name} onChange={this.nameChange} />
                <input type="text" placeholder='username' value={this.state.username} onChange={this.usernameChange} />
                <input type="password" placeholder='password' value={this.state.password} onChange={this.passwordChange} />

                <button disabled={this.props.loading} onClick={this.signup}>Sign-up</button>

                <ul>
                    {errorListItems}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: loading(state),
    user: signedUpUser(state),
    errorsMessages: errorsMessages(state),
    errorTypes: errorTypes(state)
});


const mapDispatchToProps = dispatch => ({
    signupUser: user => dispatch(createUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
