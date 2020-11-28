import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import { Feed } from "./components/template/feed";
import home from "./components/template/home";
import Layout from "./components/layout/layout"
const App = ({ children }) => (
  <div >
    {children}
  </div>
);
// "proxy": "https://poshangyan.herokuapp.com/",

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import SingleComponent from "./UtilViews/singleCmponent";
import axios from 'axios'
// axios.DERA 
axios.defaults.baseURL = "https://poshangyan-backend.herokuapp.com/"
// axios.defaults.headers.common['Access-Control-Allow-Origin']='*'
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
ReactDOM.render(
  <App>
    <Layout>
      <Router>
      <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/feed2626data' component={Feed} />
      </Switch>
      </Router>
    </Layout>
  </App>,
  document.getElementById("root")
);
