import React from 'react'
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Cart from './components/template/cart'
import Layout from "./components/layout/layout"
import About from "./components/template/about"
import ImportantLinks from './components/template/important-links'
import {CartProvider} from "./components/context/cart.context"
import './App.css'

const App = () => {
    return (
     <CartProvider>
          <Router>
            <Switch>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/:theme/:title' component={SingleCreative}/>
                    <Route exact path='/about-us' component={About}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/important-links' component={ImportantLinks}/>
                </Layout> 
           </Switch>
        </Router>
     </CartProvider>
    )
}

export default App
