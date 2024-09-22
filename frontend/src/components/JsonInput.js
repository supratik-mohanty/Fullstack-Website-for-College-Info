import React, { useState } from 'react';
import SubmitButton from './SubmitButton';
import Response from './Response';

const JsonInput = ({ selectedOptions }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jsonData = JSON.parse(jsonInput);
      const filteredData = selectedOptions.reduce((acc, option) => {
        if (option === 'alphabets') {
          acc.alphabets = jsonData.alphabets;
        } else if (option === 'numbers') {
          acc.numbers = jsonData.numbers;
        } else if (option === 'highestLowercaseAlphabet') {
          acc.highestLowercaseAlphabet = jsonData.highestLowercaseAlphabet;
        }
        return acc;
      }, {});
      const fileBuffer = new Buffer(file);
      const fileB64 = fileBuffer.toString('base64');
      const formData = {
        data: filteredData,
        file_b64: fileB64,
      };
      fetch('/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      setError('Invalid JSON input');
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON data" />
      <input type="file" onChange={handleFileChange} />
      <SubmitButton jsonInput={jsonInput} handleSubmit={handleSubmit} disabled={loading} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && <Response data={response} selectedOptions={selectedOptions} />}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default JsonInput;