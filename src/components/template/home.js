import React, { Component } from "react";
import {  Paper } from "@material-ui/core";
import MuiGrid from "@material-ui/core/Grid";
import axios from "axios";
import NoPostFound from "../../UtilViews/nopostfound";
import PopupPostNotFound from "../../UtilViews/postNotFound";
import PopupFoundPost from "../../UtilViews/expandDefaultOpen";
import rext from "../../assets/Images/Rectangle1.png";
import ContactUs from "../../UtilViews/ContactUs";
import Banner from "../organism/banner";
import ThemeOfMonth from "../organism/theme-of-month"
import LatestBehave from "../organism/latest-behavioural"
import Cards from "../molecules/cards-sm"
import MostDownloadMedia from "../organism/most-download-media"
import Footer from "../layout/footer"
import Header from "../layout/header"
import { Container } from 'semantic-ui-react'
export class Feed extends Component {
  constructor() {
    super();
    this.state = {
      themes: [],
      languages: [],
      mediaType: [],
      targetAudience: [],
      source: [],
      themeOfTheMonth : [],
      popularVid:[],
      posts:[],
      pageNo:1,
      totalPage:0,
      here:false,
      percentDownloaded:20,
      popUpShowType:0,
      popupData:null
    };
  }
  getPriview = () => {
    this.setState({ hidden: false });
  };

  handleThemeChange = (e, data) => {
    // console.log(data);
    // console.log(data.option);
    let arr = this.state.themes;
    if (arr.includes(data.option.value)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data.option.value) {
          arr.splice(i, 1);
        }
      }
    } else {
      arr.push(data.option.value);
    }
    this.setState({ themes: arr });
    // console.log(this.state.themes);

    // this.setState({ source: data.value });
  };
  handleLanguageChange = (e, data) => {
    let arr = this.state.languages;
    if (arr.includes(data.option.value)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data.option.value) {
          arr.splice(i, 1);
        }
      }
    } else {
      arr.push(data.option.value);
    }
    this.setState({ languages: arr });
    // console.log(this.state.languages);
  };
  handleMediaTypeChange = (e, data) => {
    let arr = this.state.mediaType;
    if (arr.includes(data.option.value)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data.option.value) {
          arr.splice(i, 1);
        }
      }
    } else {
      arr.push(data.option.value);
    }
    this.setState({ mediaType: arr });
    // console.log(this.state.mediaType);
  };
  handleAudienceChange = (e, data) => {
    let arr = this.state.targetAudience;
    if (arr.includes(data.option.value)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data.option.value) {
          arr.splice(i, 1);
        }
      }
    } else {
      arr.push(data.option.value);
    }
    this.setState({ targetAudience: arr });
    // console.log(this.state.targetAudience);
  };
  handleSourceChange = (e, data) => {
    let arr = this.state.source;
    if (arr.includes(data.option.value)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data.option.value) {
          arr.splice(i, 1);
        }
      }
    } else {
      arr.push(data.option.value);
    }
    this.setState({ source: arr });
    // console.log(this.state.source);
  };
  handlePageChange = (e, data) => {
    // console.log(data.value)
    console.log(data)
    this.setState({pageNo:data.activePage})
  };

  handleFilter = () => {
    var FilterData = {
      themes:this.state.themes.toString(),
      languages:this.state.languages.toString(),
      targetAudience:this.state.targetAudience.toString(),
      mediaType:this.state.mediaType.toString(),
      source:this.state.source.toString(),
    }
    const formData = new FormData();
    formData.append("themes", this.state.themes.toString());
    formData.append("languages", this.state.languages.toString());
    formData.append("targetAudience", this.state.targetAudience.toString());
    formData.append("source", this.state.source.toString());
    formData.append("mediaType", this.state.mediaType.toString());
    // console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeee')
    // console.log(FilterData)
    axios
      .post("/getFilteredInfo", FilterData)
      .then((res) => {
        // console.log(res.data);
        var l = res.data.length;
        var ans=0;
        if(l%12) ans++;
        ans+=Math.floor(l/12);

        this.setState({totalPage:ans});
        this.setState({pageNo:1})

        this.setState({posts:res.data});
        this.setState({themeOfTheMonth:[]});
        this.setState({here:true});
      })
      .catch((err) => {
        // console.log(err);
      });
  }


  componentDidMount(){
    var FilterData = {
      themes:this.state.themes.toString(),
      languages:this.state.languages.toString(),
      targetAudience:this.state.targetAudience.toString(),
      mediaType:this.state.mediaType.toString(),
      source:this.state.source.toString(),
    }
    axios
      .post("/getFilteredInfo", FilterData)
      .then((res) => {
        // console.log(res.data);

        var l = res.data.length;
        var ans=0;
        if(l%12) ans++;
        ans+=Math.floor(l/12);

        this.setState({totalPage:ans});
        this.setState({pageNo:1})

        // console.log(this.state.totalPage)
        // console.log(l)
        
        this.setState({posts:res.data});

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const postId = params.get('postId')
        // console.log(params.get('postId'))
        if(params.get('postId') != null){
            let myPost = null;
            let pos = this.state.posts;
            for(var i=0;i<l;i++)
            {
              if(pos[i]._id == postId) myPost=pos[i];
            }
            if(myPost!=null){
              this.setState({popupData:myPost})
              this.setState({popUpShowType:1})
            }else{
              this.setState({popUpShowType:2})
            }
          

        }
      })
      .catch((err) => {
        // console.log(err);
        
      });
      axios
      .get("/getThemesOfTheMonth")
      .then((res) => {
        // console.log(res.data);
        this.setState({themeOfTheMonth:res.data});
        
      })
      .catch((err) => {
        // console.log(err);
        
      });
      axios
      .get("/getPopolarVideos")
      .then((res) => {
        // console.log(res.data);
        this.setState({popularVid:res.data});
        
      })
      .catch((err) => {
        // console.log(err);
        
      });

      
      
  }

  
  
  render() {
    
    var currPage = this.state.pageNo;
    var themeOfTheMonth = this.state.themeOfTheMonth ? this.state.themeOfTheMonth.slice(0,4)  : null;
    var popularVideos = this.state.popularVid ? this.state.popularVid.slice(0,4) : null
    var posts = this.state.posts ? this.state.posts.slice((currPage-1)*12,currPage*12) : null
      let post=null,them=null,popVid=null,latestMedia=null,Behavioral=null;
    if(posts) post = posts.map(pos => <Cards post={pos} fromPos='true' key={pos.postId} /> )
    if(post && posts.length==0) post = <NoPostFound />
    if(themeOfTheMonth) them = themeOfTheMonth.map(pos => <Cards post={pos} key={pos.postId} /> )
    if(popularVideos) popVid = popularVideos.map(pos => <Cards post={pos} key={pos.postId} /> )


    var themeArray = [],
      langsArray = [],
      mediaTypeArray = [],
      sourceArray = [],
      AudiuanceArray = [];

      let popUp = null;

    let latestPosts = posts;
    let behav = posts;

    if(latestPosts && posts.length>0 ) {
      // latestPosts.sort((a,b)=>{
      //   return a.createdAt > b.createdAt;
      // })
      latestPosts = latestPosts.slice(posts.length-3,posts.length-1);
      // let ind = Math.floor(Math.random() * posts.length-2);
      behav = posts.slice(5,5+2);
    }

    if(latestPosts) latestMedia = latestPosts.map(pos => <Cards post={pos} key={pos.postId} /> )
    if(behav) Behavioral = behav.map(pos => <Cards post={pos} key={pos.postId} /> )
    

    var themes = [
      'Any',
      "Ante Natal Care (ANC)",
      "Breastfeeding",
      "Anaemia Prevention",
      "Immunization",
      "Growth Monitoring",
      "Sanitation/ WASH",
      "Diarrhoea Management",
      "Diet Diversity/ Overall Nutrition",
      "Millet",
      "Food Fortication ",
      "Girls Education, Diet & Right Age of Marriage",
      "Poshan Pakhwada",
      "Complementary Feeding"
    ];
    var langs = [
      "Assamese",
      "Bengali",
      "Gujarati",
      "Hindi",
      "Kannada",
      "Kashmiri",
      "Konkani",
      "Malayalam",
      "Manipuri",
      "Marathi",
      "Nepali",
      "Oriya",
      "Punjabi",
      "Sanskrit",
      "Sindhi",
      "Tamil",
      "Telugu",
      "Urdu",
      "Bodo",
      "Santhali",
      "Maithili",
      "Dogri",
      "Any",
      "English"
    ];

    var mediaType = [
      'Any',
      'IPC',
      'Mass Media',
      'Outdoor',
      'Social Media'
    ]
    var targetAudience = [
      'Any',
      'Children under 5',
      'Adolescent Girls Mothers',
      'Pregnant Women',
      'PRI member',
      'Civil society',
      'other'
    ]

    var source = [
      'Any',
      'MoHFW',
      'MoWCD',
      'others',
    ]


    themes.sort();
    langs.sort();
    mediaType.sort();

    for (var i = 0; i < themes.length; i++) {
      themeArray.push({
        key: i,
        label: themes[i],
        value: themes[i]
      });
    }
    for (var i = 0; i < langs.length; i++) {
      langsArray.push({
        key: i,
        label: langs[i],
        value: langs[i]
      });
    }
    for (var i = 0; i < source.length; i++) {
      sourceArray.push({
        key: i,
        label: source[i],
        value: source[i]
      });
    }
    for (var i = 0; i < mediaType.length; i++) {
      mediaTypeArray.push({
        key: i,
        label: mediaType[i],
        value: mediaType[i]
      });
    }
    for (var i = 0; i < targetAudience.length; i++) {
      AudiuanceArray.push({
        key: i,
        label: targetAudience[i],
        value: targetAudience[i]
      });
    }

    

    if(this.state.popUpShowType==1&&this.state.popupData) popUp = <PopupFoundPost post={this.state.popupData} />
    if(this.state.popUpShowType==2) popUp = <PopupPostNotFound post={this.state.popupData} />

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
    }
   const menuData=[
      {
        label:"Theme",
        option:themeArray,
        func:this.handleThemeChange,
      },
      {
        label:"Language",
        option:langsArray,
        func:this.handleAudienceChange,
      },
      {
        label:"Media Type",
        option:mediaTypeArray,
        func:this.handleMediaTypeChange,
      },
      {
        label:"Target Audience",
        option:AudiuanceArray,
        func:this.handleAudienceChange,
      },
      {
        label:"Source",
        option:sourceArray,
        func:this.handleSourceChange,
      },
    ]
    return (
      <div>
        {popUp}

        {/* Banner of home page */}
        <Banner menuData={menuData} arrow={this.handleFilter}/>
        
        <div style={{ background: "rgb(234,231,199)" }}>
         { !this.state.here 
          ? <>
                <ThemeOfMonth> {them} </ThemeOfMonth>
                <LatestBehave latest={latestMedia} behave={Behavioral}/>
            </>
          : null}
          <MostDownloadMedia post={post} pageNo={this.state.pageNo} totalPage={this.state.totalPage} handlePageChange={this.handlePageChange}/>
        </div>
        {/* <div style={{ padding: 20, position: "relative" }}>
          <h2><em><strong>Polpular Films</strong></em></h2>
          <h5
            style={{
              position: "absolute",
              right: "8px",
              color: "red",
              top: "0px"
            }}
          >
            {"view all> "}
          </h5>
          <MuiGrid container style={{ padding: 10 }} spacing={3}>
            {popVid}
          </MuiGrid>
        </div> */}
        <ContactUs />
      </div>
    );
  }
}

export default Feed;
