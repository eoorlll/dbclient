import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function renderApp() {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </StrictMode>
  );
}

import('./mocks/browser').then(renderApp);