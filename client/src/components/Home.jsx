import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewPost, getUserDataFromSession, getRecentQuestions } from '../actions';
import QuestionList from './QuestionList';
import Form from './Form';

class HomePage extends Component {

  componentDidMount() {
    this.props.getRecentQuestions();
    this.props.getUserDataFromSession();
  }

  /**
   * Calls the createNewPost action
   */
  onSubmit = (data) => {
    const newPostObject = {
      postContent: data,
      user: this.props.currentUser
    };
    this.props.createNewPost(newPostObject);
  }

  questionListStyles = {
    display: 'block',
    height: '90vh',
    overflow: 'auto',
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div style={this.questionListStyles} className='col-lg-8 col-md-8 col-sm-12'>
            <QuestionList
              questions={this.props.questions}
            />
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12'>
            {this.props.authenticated ?
              <Form
                hasTitleField
                form={{
                  title: 'Create a new post',
                  placeholder: 'Whats new?',
                  buttonTitle: 'Create Post',
                  onSubmit: this.onSubmit
                }}
              />
              : 'Please sign in'}
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    authenticated: state.currentUser._id,
    questions: state.questions,
  };
}

export default connect(mapStateToProps,
  {
    getUserDataFromSession,
    getRecentQuestions,
    createNewPost
  })(HomePage);