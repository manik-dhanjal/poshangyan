import React from 'react'
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Cart from './components/template/cart'
import Layout from "./components/layout/layout"
import About from "./components/template/about"
import {CartProvider} from "./components/context/cart.context"
import './App.css'

const App = () => {
    return (
     <CartProvider>
          <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/:theme/:title' component={SingleCreative}/>
                    <Route exact path='/about-us' component={About}/>
                    <Route exact path='/cart' component={Cart}/>
                </Switch>
            </Layout>
        </Router>
     </CartProvider>
    )
}

export default App
