import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from "./header"
import Footer from "./footer"
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';
import { LoadingSpinner } from 'video-react';
import axios from "axios"
const Div = styled.div`

`
const Layout = ({children,history,location}) => {
    const [siteAnalytics,setSiteAnalytics] = useState({});
    const fetchAnalyticsData = async () => {
        try{
            const userID = localStorage.getItem("userID")
            const {data} = await axios.post('/visitors-analytics',{userID:userID})
            localStorage.setItem("userID",data.userID)
            setSiteAnalytics(data)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        history.listen((location) => {
            ReactGA.set({ page: location.pathname+ location.search });
            ReactGA.pageview(location.pathname+ location.search)
          }
        );
        fetchAnalyticsData();
    },[])
    return (
        <Div>
            <Header/>
             <main>{children}</main>
            <Footer visitCount = {siteAnalytics.uniquieVisits}/> 
        </Div>
    )
}

export default withRouter(Layout)
