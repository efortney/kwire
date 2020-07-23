import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


class AuthenticationButton extends Component {

  render() {
    const { authenticated } = this.props;
    const buttonText = authenticated ? 'Sign Out' : 'Sign In'
    const buttonColor = authenticated ? 'secondary' : 'primary'
    const targetUrl = authenticated ? '/api/logout' : '/auth/google'
    return (
      <div className="auth-button">
        <a style={{ textDecoration: "none" }} href={targetUrl}>
          <Button
            variant="contained"
            color={buttonColor}>
            {buttonText}
          </Button>
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.currentUser._id,
  };
}

export default connect(mapStateToProps)(AuthenticationButton);