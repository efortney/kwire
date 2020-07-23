import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { useState } from 'react';
import ModalView from './ModalView';
import Form from './Form';

/**
 * Card component 
 * 
 * Props -
 * post: object, the data of the post to display
 */
const Card = ({ post, user }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const handleViewModal = () => {
    isViewModalOpen ? setIsViewModalOpen(false) : setIsViewModalOpen(true);
  }

  const handleReplyModal = () => {
    isReplyModalOpen ? setIsReplyModalOpen(false) : setIsReplyModalOpen(true);
  }

  const imageStyle = {
    borderRadius: '50%',
    maxWidth: '3rem',
  }

  const bodyStyle = {
    overflow: 'hidden',
    maxHeight: '90px'
  }

  const questionCardStyle = {
    padding: '1rem',
    border: '1px solid #E6ECF0',
  }

  /**
   * Makes a POST request to create a new reply.
   * @param {object} data: The data from the submitted form
   */
  const onSubmit = async (data) => {
    let replyObject = {
      replyContent: data,
      postContent: post,
      user: user
    }
    const postData = await fetch('/api/questions/reply', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(replyObject)
    });
    if (postData.status === 500) {
      alert('There was an error sending you reply. Please try again.')
    } else {
      setIsReplyModalOpen(false);
    }
  };

  /**
   * Responsible for managing and rendering the two modals that may be displayed 
   * at any time, viewModal and replyModal
   */
  const renderModals = () => {
    return (
      <div>
        <ModalView
          handler={handleReplyModal}
          showFooterButton
          buttonText='Reply'
          title={post.title}
          show={isViewModalOpen && !isReplyModalOpen}
          onHide={handleViewModal}
        >
          {post.body}
        </ModalView>
        <ModalView
          showFooterButton={false}
          buttonText='Sumbit'
          title='Reply'
          show={isReplyModalOpen}
          onHide={handleReplyModal}
        >
          <Form
            hasTitleField={false}
            form={{
              title: '',
              placeholder: 'Write your reply here',
              buttonTitle: 'Send',
              onSubmit: onSubmit,
            }}
          />
        </ModalView>
      </div>
    )
  }

  const renderCard = () => {
    return (
      post.author ?
        <div style={questionCardStyle} className='question-card'>
          <div className='row'>
            <div className='col'>
              <h5>{post.title}</h5>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-1 col-md-2 col-sm-2'>
              <div className='float-left'>
                <img
                  style={imageStyle}
                  alt='profile'
                  src={post.author.picture}>
                </img>
              </div>
            </div>
            <div className='body col-lg-11 col-md-10 col-sm-10' style={bodyStyle}>
              <p>{post.body}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col float-left' style={{ marginTop: '14px' }}>
              <div>
                <button onClick={() => { handleViewModal() }} className='btn btn-outline-primary btn-sm'>View Post</button>
                {renderModals()}
              </div>
            </div>
            <div className='col text-right'>
              posted <Moment local format='MMM DD, YYYY'>
                {post.updatedAt}
              </Moment> by {post.author.firstName}
            </div>
          </div>
        </div>
        : null
    )
  }

  return (
    renderCard()
  )
};

export default Card;  