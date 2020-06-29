import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
//import * as serviceWorker from './serviceWorker';

const config = {
  apiKey: "AIzaSyBz9xF7tjNjndfvyd0Lo_wKPU47VgeIEcw",
  authDomain: "localhost",
  databaseURL: "https://planning-677be.firebaseio.com/",
  projectId: "planning-677be",
};

initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
