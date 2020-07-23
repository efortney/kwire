import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * ModalView is the copmponent that will be displayed when a user clicks the view button on a post card.
 * 
 * Props -
 * post: object, the post's data to display on the card
 * show: boolean, true if the modal is open, false otherwise
 * onHide: function, responsible for handling the closing behavior of the modal
 * buttonText: string, the text of the footer button
 */
const ModalView = ({ show, onHide, buttonText, handler, title, showFooterButton, children }) => {
  return (
    <div>
      <>
        <Modal scrollable size="xl" centered show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{title ? title : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          {showFooterButton &&
            <Modal.Footer>
              <Button onClick={handler} block variant="outline-success" >
                <i className="far fa-edit"></i> {buttonText}
              </Button>
            </Modal.Footer>
          }
        </Modal>
      </>
    </div>
  )
}

export default ModalView;