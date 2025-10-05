import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./Theme/GlobalStyled";

import store, { persistor } from "./redux-toolkit/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";

import { Toaster } from "sonner";
import { MessageProvider } from "./hooks/message-context";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <GlobalStyle />
          <MessageProvider>
            <App />
          </MessageProvider>
          <Toaster
            position="top-right"
            expand={false}
            richColors
            duration={3000}
          />
        </Router>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
