import React, {useCallback, useState} from 'react';
import { Fragment } from 'monteur';

function useBackgroundToggle() {
  const [flag, setFlag] = useState(false);

  const toggle = useCallback(() => {
    setFlag(f => {
      document.body.style.backgroundColor = !f ? '#345' : 'white'
      return !f;
    });
  }, []);

  return [flag, toggle];
}

export function App(props) {
  const [blackBackground, toggleBackground] = useBackgroundToggle();
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (event) => {
    Fragment.dispatchEvent('value-changed', event.target.value);
    setInputVal(event.target.value);
  };

  return (
    <div style={{color: blackBackground ? 'white' : 'black'}}>
      <h4>Hi, I'm the framed fragment '{props.name}' :)</h4>
      <p>
        I was rendered inside an iframe and don't have to care about isolating my javascript or styles.<br />
        Try it out and <button onClick={() => toggleBackground()}>toggle</button> document.body background color to {blackBackground ? 'light' : 'dark'}!
      </p>
      <div style={{margin: '24px 0'}}>
        <p>Insert some value and send it to the host application.</p>
        <input type="text" value={inputVal} onChange={handleInputChange} />
      </div>
    </div>
  );
}
