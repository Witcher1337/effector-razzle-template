import { fork } from "effector";
import { Provider } from "effector-react/scope";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Application } from "./application";

// if (module.hot) {
//   module.hot.accept();
// }

const scope = fork({
  values: window.INITIAL_STATE,
});

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider value={scope}>
      <Application />
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root"),
);
