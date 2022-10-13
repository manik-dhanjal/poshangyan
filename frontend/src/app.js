import React ,{useState,useEffect}from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./components/template/home";
import SingleCreative from "./components/template/single-creative"
import Search from "./components/template/search"
import Layout from "./components/layout/layout"
import About from "./components/template/about"
import AdminPortal from "./components/template/adminPortal"
import ImportantLinks from './components/template/important-links'
import Register from './components/auth/register';
import Login from './components/auth/login'; 
import NotFound from "./components/template/not-found.page/not-found.page"
import { CartProvider } from "./components/context/cart.context"
import { PostProvider } from "./components/context/post.context"
import UserContext from './components/context/userContext';
import axios from 'axios';
import ReactGA from 'react-ga';
import './App.css'

const App = () => {
    const [ userData, setUserData] = useState({
        status:"pending",
        token: undefined,
        user: undefined
    });
 

    
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if(token === null){
                localStorage.setItem("auth-token", "");
                token = "";
            }
            try{
                const tokenResponse = await axios.post('/2626/tokenIsValid', null, {headers: {"x-auth-token": token}});
                if (tokenResponse.data) {
                    const userRes = await axios.get("/2626/", {headers: { "x-auth-token": token },});
                    setUserData({token:token,user: userRes.data,status:"success"});
                }
                else{
                    setUserData({token:null,user: null,status:"failed"});
                }
            }catch(e){
                console.log(e.message);
            }
        }
            checkLoggedIn();
   
        }, []);
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <CartProvider>
                <PostProvider>
                    <Router basename={process.env.PUBLIC_URL||""}>
                        <Layout>
                            <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path='/search' component={Search} />
                                    <Route exact path='/2626/login' component={Login} />
                                    <Route exact path='/2626/register' component={Register}/>
                                    <Route exact path='/2626/dashboard' component={AdminPortal} />
                                    <Route exact path='/:theme/:title' component={SingleCreative} />
                                    <Route exact path='/about-us' component={About} />
                                    <Route exact path='/important-links' component={ImportantLinks} />
                                    <Route component={NotFound}/>
                                </Switch>
                        </Layout>
                    </Router>
                </PostProvider>
            </CartProvider>
        </UserContext.Provider>
    )
}

export default App
