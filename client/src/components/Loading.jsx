import React from 'react';

const Loading = () => {

  const SpinnerStyle = {
    width: '4rem',
    height: '4rem',
    position: 'fixed',
    left: '50%',
    top: '30%'
  }

  return (
    <div className='text-center'>
      <div style={SpinnerStyle} className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

}

export default Loading