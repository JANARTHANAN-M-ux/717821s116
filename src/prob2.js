import React, { useState } from 'react';
import axios from 'axios';

function AverageCalculator() {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState('');

  const fetchNumbers = async (type) => {
    try {
      const response = await axios.get(`http://20.244.56.144/numbers/${type}`);
      return response.data.numbers;
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
      return [];
    }
  };

  const handleRequest = async (type) => {
    const prevNumbers = [...windowCurrState];
    const fetchedNumbers = await fetchNumbers(type);
    const newNumbers = [...windowCurrState, ...fetchedNumbers.filter(num => !windowCurrState.includes(num))].slice(-10);

    const sum = newNumbers.reduce((acc, num) => acc + num, 0);
    const avg = (sum / newNumbers.length).toFixed(2);

    setWindowPrevState(prevNumbers);
    setWindowCurrState(newNumbers);
    setNumbers(fetchedNumbers);
    setAverage(avg);
  };

  return (
    <div>
      <button onClick={() => handleRequest('primes')}>Fetch Prime Numbers</button>
      <button onClick={() => handleRequest('fibo')}>Fetch Fibonacci Numbers</button>
      <button onClick={() => handleRequest('even')}>Fetch Even Numbers</button>
      <button onClick={() => handleRequest('rand')}>Fetch Random Numbers</button>

      <div>
        <pre>
          {JSON.stringify({
            windowPrevState,
            windowCurrState,
            numbers,
            avg: average
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
export default AverageCalculator;
