import React, { useCallback, useEffect, useState } from 'react';
import { Fragment } from 'monteur';

export function App(props) {
  const [counter, setCounter] = useState(0);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    setInterval(() => setCounter((counter) => ++counter), 1000);
  }, []);

  const handleChange = useCallback((event) => {
    Fragment.dispatchEvent('value-changed', event.target.value);
    setInputVal(event.target.value);
  }, []);

  return (
    <div>
      <h5>
        Hi, I am the unframed fragment {props.name} ({props.id})
      </h5>
      <span>{counter}</span>

      <input type="text" value={inputVal} onChange={handleChange} />
    </div>
  );
}
