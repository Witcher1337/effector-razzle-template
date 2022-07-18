import { fork } from "effector";
import { Provider } from "effector-react/scope";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Application } from "./application";

if (module.hot) {
  module.hot.accept();
}

const scope = fork({
  values: window.INITIAL_STATE,
});

const container = document.getElementById("root");

if (container) {
  hydrateRoot(
    container,
    <BrowserRouter>
      <Provider value={scope}>
        <Application />
      </Provider>
    </BrowserRouter>,
  );
}
