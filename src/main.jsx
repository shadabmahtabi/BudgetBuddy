import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Global.css";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./Context.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Context>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        zIndex={999999}
        theme="colored"
      />
    </Context>
  </Provider>
);
