import React from 'react';

const Response = ({ data, selectedOptions }) => {
  if (!data) return null;

  const filteredData = selectedOptions.reduce((acc, option) => {
    if (option === 'alphabets') {
      acc.alphabets = data.alphabets;
    } else if (option === 'numbers') {
      acc.numbers = data.numbers;
    } else if (option === 'highestLowercaseAlphabet') {
      acc.highestLowercaseAlphabet = data.highestLowercaseAlphabet;
    }
    return acc;
  }, {});

  return (
    <div>
      {filteredData.alphabets && (
        <div>
          <h2>Alphabets:</h2>
          <ul>
            {filteredData.alphabets.map((alphabet) => (
              <li key={alphabet}>{alphabet}</li>
            ))}
          </ul>
        </div>
      )}
      {filteredData.numbers && (
        <div>
          <h2>Numbers:</h2>
          <ul>
            {filteredData.numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
      {filteredData.highestLowercaseAlphabet && (
        <div>
          <h2>Highest Lowercase Alphabet:</h2>
          <p>{filteredData.highestLowercaseAlphabet}</p>
        </div>
      )}
      {data.file_valid && (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {data.file_name}</p>
          <p>File Size: {data.file_size_kb} KB</p>
          <p>File Type: {data.file_mime_type}</p>
        </div>
      )}
    </div>
  );
};

export default Response;