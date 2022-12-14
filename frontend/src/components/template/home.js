import React,{useEffect,useState} from "react";
import axios from "axios";
import ContactUs from "../organism/ContactUs";
import Banner from "../organism/banner";
import ThemeOfMonth from "../organism/theme-of-month"
import LatestBehave from "../organism/latest-behavioural"
import MostDownloadMedia from "../organism/most-download-media"

const Home = () =>{

const [post,setPost] = useState({
  data:[],
  behavData:[],
    status:"pending"
});


useEffect(() => {
    (async () => {
      try{
        const [data,behavData] = await axios.all([
            axios.post(`/getFilteredInfo`), 
            axios.post(`/getFilteredInfo`, {
              filter:{
                themes:"Behavioural Insights"
              }
            })
          ])
          setPost({
                data:data.data.post,
                behavData:behavData.data.post,
                status:"success"
          })
      }
      catch{
            setPost({
                data:[],
                behavData:[],
                status:"fail"
            })
      }
    })()
  },[])
    return (
      <div>
        <Banner >
          <h1>Poshan Gyan</h1>
          <h2>The most trusted and comprehensive resources to improve India's nutrition and health behaviours, at your fingertips</h2>
        </Banner>
        <div style={{ background: "white" }}>
          <ThemeOfMonth/>
          <LatestBehave post={post}/>
          <MostDownloadMedia post={post}/>
        </div>
        <ContactUs asd={"asd"} />
      </div>
    );
  
}

export default Home;
