# Monteur
Is a library to construct simple micro frontends based on fragments. 
A fragment is a separately deployed web application (micro frontend) consisting of at least an index.html file.
Monteur allows the host fragment to load these micro frontend into the existing application
and to communicate with the fragment. While doing this monteur is 100% framework agnostic :)

### How it works

The concept of monteur is very basic and consists of 3 steps. The host application loads the fragment resources from the specified url, which have to return a html page.
Once the resources are loaded, the initialization handshake is performed, to tell the fragment which data it should use to render.
Last but not least the host and the fragment application can communicate via an event bus in both directions. 

Monteur provides two different ways of rendering fragments. The first and easiest method is the framed approach which renders
the micro frontend inside an iframe which provides great isolation and no app has to care about colliding styles or javascript.
The second method is to fetch the html tags from the micro frontend index.html and append it to the current DOM.
For the second method I clearly can say great power comes with great responsibility as you have to care about colliding styles, javascript and the urls.
For more information read the howto for this method <small>(coming soon)</small>. 

### How to use

##### Host application

*Example based on React*

Install monteur
```
npm i monteur
```

Create wrapper component to render fragment
```
import React from 'react';
import {Host} from 'monteur';

export function SomeMicroFrontend(props) {
  const container = useRef(null);

  useEffect(() => {
    let fragmentHolder;
    Host.renderFragment(
      container.current, 
      'https://micro.frontend/url',
      defaultConfig => ({crazyOption: props.crazyOption, name: 'myName'}),
      true
    ).then(fragment => {
      fragmentHolder = fragment;
      fragment.addEventListener('some-value-changed', newValue => props.onSomeValueChanged(newValue));
    });

    return () => fragmentHolder.destroy();
  }, [container]);

  return (<div ref={container} />);
}
```

Use the fragment component
```
import React from 'react';
import {SomeMicroFrontend} from './SomeMicroFrontend.jsx';

export function App() {
  const [val, setVal] = useState(null);
  return (
    <div>
      <p>Value from micro frontend {val}</p>
      <SomeMicroFrontend 
        crazyOption="Fancy value"
        onSomeValueChanged={newValue => setVal(newValue)}
      />
    </div>
  );
}
```

##### Fragment application

*Example based on React*

Install monteur
```
npm i monteur
```

Initialize fragment and bootstrap application.
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Fragment} from 'monteur';

function bootstrap(config) {
  ReactDOM.render(
    <App crazyOption={config.crazyOption} name={config.name} />,
    document.getElementById('root')
  );
}

if (Fragment.isFragment()) {
  const defaultConfig = {name: 'Unknown'};
  Fragment.initialize(defaultConfig, config => bootstrap(config));
} else {
  // Bootstrap with dummy data or for standalone case
  bootstrap({name: 'Thomas', crazyOption: 'Super fancy value'});
}
``` 


### Development

##### Commands

- `yarn build`: Creates umd and es6 module build
- `yarn build:main`: Creates umd build
- `yarn build:module`: Creates es6 module build
- `yarn watch`: Creates es6 module build on every file change (used for development with `yarn example`)
- `yarn lint`: Executed eslint on src folder
- `yarn lint:fix`: Corrects fixable linter errors
- `yarn example`: Serves example pages using library's module build in dist folder

##### Local setup

For local development there is the example folder which provides a host application, a framed and unframed fragment.
Running `yarn example` will serve the applications on the ports:
- 8090: host application
- 8091: framed fragment
- 8092: unframed fragment

The examples read from the /dist folder. In order to apply library changes either execute `yarn build:module` after each change
or execute `yarn watch` to build the library on every change.


