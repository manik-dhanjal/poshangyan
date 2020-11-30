import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import { Feed } from "./components/template/feed";
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Layout from "./components/layout/layout"
		
import './assets/fonts/Lato-Bold.ttf'	
import './assets/fonts/Lato-Regular.ttf'
import './assets/fonts/Lato-Light.ttf'
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
  
      <Router>
        <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/feed2626data' component={Feed} />
            <Route exact path='/search' component={Search}/>
            <Route exact path='/:theme/:title' component={SingleCreative}/>
        </Switch>
       </Layout>
      </Router>
 
  </App>,
  document.getElementById("root")
);
