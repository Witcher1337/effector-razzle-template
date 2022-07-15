import ReactDOM from 'react-dom';
import {fork} from 'effector';
import {Application} from './application';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'effector-react/scope';

if (module.hot) {
  module.hot.accept();
}

const scope = fork({
  values: window.INITIAL_STATE,
});

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider value={scope}>
      <Application />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root'),
);

