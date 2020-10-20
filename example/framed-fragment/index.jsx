import React from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'monteur';
import { App } from './App';

if (Fragment.isFragment()) {
  Fragment.initialize({name: 'Unknown'}, config => {
    ReactDOM.render(<App name={config.name} />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<p>Ohh, I wasn't rendered as a fragment :(</p>, document.getElementById('root'));
}
