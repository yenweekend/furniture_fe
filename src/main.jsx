import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./Theme/GlobalStyled";

import { Toaster } from "sonner";
import { MessageProvider } from "./hooks/useMessage";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <GlobalStyle />
      <MessageProvider>
        <App />
      </MessageProvider>
      <Toaster position="top-right" expand={false} richColors duration={3000} />
    </Router>
  </QueryClientProvider>
);
