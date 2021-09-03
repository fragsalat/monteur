import React, { useEffect, useRef } from 'react';
import { Host } from 'monteur';

export function SomeFragment(props) {
  const container = useRef(null);
  const url = props.framed ? 'http://localhost:8091' : 'http://localhost:8092';

  useEffect(() => {
    let fragmentHolder;
    Host.renderFragment(
      container.current,
      url,
      (defaultOptions) => ({ name: props.name, id: props.id }),
      props.framed
    ).then((fragment) => {
      fragmentHolder = fragment;
      fragment.addEventListener('value-changed', (payload) => {
        console.log('Host received selected value from fragment', payload);
        props.onValueSelected(payload);
      });
    });

    return () => fragmentHolder && fragmentHolder.destroy();
  }, [container.current, props.framed]);

  return <div ref={container} />;
}

SomeFragment.defaultProps = {
  framed: false,
  onValueSelected: () => {},
};
