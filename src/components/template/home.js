import React,{useEffect,useState} from "react";
import axios from "axios";
import NoPostFound from "../../UtilViews/nopostfound";
import PopupPostNotFound from "../../UtilViews/postNotFound";
import PopupFoundPost from "../../UtilViews/expandDefaultOpen";
import ContactUs from "../../UtilViews/ContactUs";
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
              themes:"Behavioural Insights"
            })
          ])
          setPost({
                data:data.data,
                behavData:behavData.data,
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
            Use this repository to educate yourself on all the nutrition
            information. To keep yourself and your loved ones safe and
            healthy.
        </Banner>
        <div style={{ background: "rgb(234,231,199)" }}>
          <ThemeOfMonth/>
          <LatestBehave post={post}/>
          <MostDownloadMedia post={post}/>
        </div>
        <ContactUs />
      </div>
    );
  
}

export default Home;
