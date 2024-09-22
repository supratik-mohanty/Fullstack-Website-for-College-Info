import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' },
  ]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
  };

  return (
    <div>
      <select multiple={true} value={selectedOptions} onChange={(e) => handleOptionChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <JsonInput selectedOptions={selectedOptions} />
    </div>
  );
};

export default Dropdown;