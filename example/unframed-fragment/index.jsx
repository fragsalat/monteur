import React from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'monteur';
import { App } from './App';

function render(data, container) {
  ReactDOM.render(<App {...data} />, container.querySelector('.root'));
}

if (Fragment.isFragment()) {
  Fragment.initialize({}, (payload, container) => {
    render(payload, container);
  });
} else {
  // eslint-disable-next-line no-undef
  render({ id: 'none' }, document.body);
}
