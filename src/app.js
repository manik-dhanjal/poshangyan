import React from 'react'
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Layout from "./components/layout/layout"
import './app.css'
const App = () => {
    return (
    <Router>
        <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={Search}/>
            <Route exact path='/:theme/:title' component={SingleCreative}/>
        </Switch>
       </Layout>
    </Router>
    )
}

export default App
