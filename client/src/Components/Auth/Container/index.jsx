import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { signIn, signUp } from '../../../actions/auth';

//toasts
import { errorMessage } from '../../../toasts';

//components
import Button from '../components/GoogleButton';
import Form from '../components/ExtraForm';

class SignIn extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      auth: PropTypes.object.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    signUp: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      data: null,
      slackId: '',
      githubId: ''
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.completeSignUp = this.completeSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.auth && nextProps.auth.auth.errors) {
      this.setState(() => ({
        showForm: true,
        slackId: '',
        githubId: ''
      }));
    }
    if (nextProps.auth.auth && nextProps.auth.auth.message) {
      this.setState(() => ({
        showForm: false
      }));
    }
    if (nextProps.auth.auth && nextProps.auth.auth.data) {
      nextProps.history.push('/teams');
    }
  }

  completeSignUp(event) {
    event.preventDefault();
    const { data, slackId, githubId } = this.state;
    const userData = {
      ...data,
      githubUsername: githubId,
      slackId
    };
    this.props.signUp(userData);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSuccess(response) {
    const {
      profileObj: {
        givenName, email, googleId, imageUrl
      }
    } = response;
    const data = {
      displayName: givenName,
      email,
      googleId,
      photo: imageUrl
    };
    if (email.includes('@andela.com')) {
      this.setState({ data });
      if (data) {
        this.props.signIn(data);
      }
    } else {
      errorMessage('Login with your andela email address');
    }
  }
  handleFailure = response => {
    this.setState({ showForm: false });
  };
  render() {
    const { showForm, slackId, githubId } = this.state;
    return (
      <div className="sign-in-wrapper">
        {!showForm && (
          <div className="row">
            <Button
              handleFailure={this.handleFailure}
              handleSuccess={this.handleSuccess}
            />
          </div>
        )}
        {showForm && (
          <div className="row">
            <Form
              handleForm={this.completeSignUp}
              handleChange={this.handleChange}
              slackId={slackId}
              githubId={githubId}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signIn, signUp })(SignIn);
