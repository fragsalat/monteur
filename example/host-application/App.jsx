import React, { useState } from 'react';
import { SomeFragment } from './SomeFragment';

export function App() {
  const [framed, setFramed] = useState(true);
  const [value, setValue] = useState(null);
  return (
    <div>
      <h3>Hi I'm the host application</h3>
      <div style={{margin: '32px 0'}}>
        <label>
          <input type="radio" name="fragment-type" checked={framed} onChange={() => setFramed(true)} />
          Show framed fragment
        </label>
        <label>
          <input type="radio" name="fragment-type" checked={!framed} onChange={() => setFramed(false)} />
          Show unframed fragment
        </label>
      </div>
      <div>
        <p>
          Selected value from fragment: {value}
        </p>
        <SomeFragment framed={framed} onValueSelected={payload => setValue(payload)} />
      </div>
    </div>
  )
}
