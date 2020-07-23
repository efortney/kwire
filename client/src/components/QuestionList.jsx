import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecentQuestions } from '../actions';
import Card from './Card';
import Loading from './Loading';

class QuestionList extends Component {

  renderQuestions() {
    return this.props.questions.map(question => {
      return (
        <Card key={question._id} user={this.props.user} post={question} />
      )
    });
  }

  render() {
    return (
      <div className='question-list container'>
        {this.props.questions.length > 0 ? this.renderQuestions() : <Loading />}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    authenticated: state.currentUser._id,
    user: state.currentUser
  };
}

export default connect(mapStateToProps, { getRecentQuestions })(QuestionList);