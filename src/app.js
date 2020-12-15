import React from 'react'
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import {Provider} from "react-redux"
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Layout from "./components/layout/layout"
import store from "./redux/store"
import  logo from './assets/Images/logo.png'
import favicon from './assets/Images/favicon.png'
import Helmet from 'react-helmet'
import './App.css'

const App = () => {
    return (
    // <Provider store={store}>    
        <Router>
            <Helmet>
                <meta charset="utf-8" />
                <link rel="icon" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                name="description"
                content="Use this repository to educate yourself on all the nutrition information. To keep yourself and your loved ones safe and healthy."
                />
                <meta property="og:url"                content="https://aksha.com" />
                <meta property="og:type"               content="Landing page" />
                <meta property="og:title"              content="Poshangyan" />
                <meta property="og:description"        content="Use this repository to educate yourself on all the nutrition information. To keep yourself and your loved ones safe and healthy." />
                <meta property="og:image"              content={logo} />
                <meta name="twitter:title" content="Poshangyan"/>
                <meta name="twitter:description" content="Use this repository to educate yourself on all the nutrition information. To keep yourself and your loved ones safe and healthy."/>
                <meta name="twitter:image" content={logo}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <link rel="apple-touch-icon" href={favicon} />
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <title>Poshangyan</title>
            </Helmet>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/:theme/:title' component={SingleCreative}/>
                </Switch>
        </Layout>
        </Router>
    // </Provider>
    )
}

export default App
