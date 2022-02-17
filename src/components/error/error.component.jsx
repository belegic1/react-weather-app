import React from 'react';
import Error from './error.png';

const ErrorMessage = () => {
  return (
    <div className="widget">
      <img src={Error} alt="error" width="200px" />
      <h3>Sorry , our api is currently down</h3>
      <p>Ty again leater</p>
    </div>
  );
};

export default ErrorMessage;
