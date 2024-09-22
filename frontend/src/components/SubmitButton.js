import React from 'react';

const SubmitButton = ({ jsonInput, handleSubmit }) => {
  return (
    <button onClick={handleSubmit} disabled={jsonInput.trim() === ''}>
      Submit
    </button>
  );
};

export default SubmitButton;

