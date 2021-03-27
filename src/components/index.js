import React from "react";
import ReactDOM from "react-dom";
import App from "./app"
import axios from 'axios'
import 'video-react/dist/video-react.css';
import './assets/fonts/Lato-Bold.ttf'	
import './assets/fonts/Lato-Regular.ttf'
import './assets/fonts/Lato-Light.ttf'

// axios.defaults.baseURL = "https://poshangyan-backend.herokuapp.com/"
//axios.defaults.baseURL = "http://15.207.28.179:3000/"
axios.defaults.baseURL = "https://poshangyan-api.niti.gov.in/"

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);