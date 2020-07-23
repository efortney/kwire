import React from 'react';
import { useState } from 'react';

/**
 * Reusable form component
 * 
 * Props - 
 * hasTitle: boolean, indicates if the form should display a title field
 * form: the contents of the form to render
 */
const Form = ({ hasTitleField, form }) => {
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  /**
   * onSubmit function passed from a parent component
   * If any value in the form is empty, an alert will be dispalyed and the 
   * form will not be submitted.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    if (!isFormValueEmpty()) {
      form.onSubmit({
        title: titleValue,
        body: bodyValue,
      });
      clearForm();
    } else {
      alert('Please fill out all fields to create a new post')
    }
  };

  // boolean that will return true if title or body value of the form is empty
  const isFormValueEmpty = () => {
    if (hasTitleField) {
      return titleValue === '' || bodyValue === '';
    } else {
      return bodyValue === '';
    }
  }

  /**
   * Clears the form fields
   */
  const clearForm = () => {
    setTitleValue('');
    setBodyValue('');
  }

  const buttonStyle = {
    marginTop: '.5rem'
  };

  return (
    <div>
      <form required>
        <div className='form-group'>
          <h5 className=''>{form.title}</h5>
          {hasTitleField &&
            <div>
              <input
                value={titleValue}
                className='form-control'
                placeholder='Title'
                onChange={(event) => setTitleValue(event.target.value)}
              />
            </div>
          }
          <textarea
            value={bodyValue}
            required
            onChange={(event) => setBodyValue(event.target.value)}
            className='form-control'
            id='formInput'
            placeholder={form.placeholder}
            rows='5'>
          </textarea>
          <button
            style={buttonStyle}
            onClick={(event) => onSubmit(event)}
            type='submit'
            className='btn btn-outline-primary float-right'>
            {form.buttonTitle}
          </button>
        </div >
      </form>
    </div>
  )
};

export default Form;