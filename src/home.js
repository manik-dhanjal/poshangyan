import React, { Component } from "react";
import {  Paper } from "@material-ui/core";
import MuiGrid from "@material-ui/core/Grid";
import "./App.css";
import axios from "axios";
import SingleComponent from "./singleCmponent";
import NoPostFound from "./nopostfound";
import { Button, Dropdown, Grid, Menu,Pagination,Progress } from "semantic-ui-react";
import go from "./go.png";
import rext from "./Rectangle1.png";
import Fab from '@material-ui/core/Fab';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
const useStyles = {
  editor: {
    marginLeft: "200px",
    background: "linear-gradient(45deg, #1E1BFB 30%, #FF8E53 90%)",
    marginTop: "10px",
    border: "5px solid #eb4559",
    width: "1000px"
  },
  root: {
    marginTop: "10px"
  },
  uploads: {
    marginTop: "10px",
    marginLeft: "910px"
  },
  button: {
    background: "linear-gradient(45deg, #1E1BFB 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 60,
    padding: "0 30px"
  }
};

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
      pageNo:0,
      totalPage:0,
      here:false,
      percentDownloaded:20
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
    console.log(this.state.themes);

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
    console.log(this.state.languages);
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
    console.log(this.state.mediaType);
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
    console.log(this.state.targetAudience);
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
    console.log(this.state.source);
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
    console.log(FilterData)
    axios
      .post("/getFilteredInfo", formData)
      .then((res) => {
        console.log(res.data);
        this.setState({posts:res.data});
        this.setState({themeOfTheMonth:[]});
        this.setState({here:true});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidMount(){
    const formData = new FormData();
    formData.append("themes", this.state.themes);
    formData.append("languages", this.state.languages);
    formData.append("label", this.state.label);
    formData.append("source", this.state.source);
    formData.append("mediaType", this.state.mediaType);
    axios
      .post("/getFilteredInfo", formData)
      .then((res) => {
        console.log(res.data);

        var l = res.data.length;
        var ans=0;
        if(l%12) ans++;
        ans+=(l/12);

        this.setState({totalPage:ans});
        
        this.setState({posts:res.data});
      })
      .catch((err) => {
        console.log(err);
        
      });
      axios
      .get("/getThemesOfTheMonth", formData)
      .then((res) => {
        console.log(res.data);
        this.setState({themeOfTheMonth:res.data});
        
      })
      .catch((err) => {
        console.log(err);
        
      });
      axios
      .get("/getPopolarVideos", formData)
      .then((res) => {
        console.log(res.data);
        this.setState({popularVid:res.data});
        
      })
      .catch((err) => {
        console.log(err);
        
      });
  }
  
  render() {
    
    var currPage = this.state.pageNo;
    var themeOfTheMonth = this.state.themeOfTheMonth ? this.state.themeOfTheMonth.slice(0,4)  : null;
    var popularVideos = this.state.popularVid ? this.state.popularVid.slice(0,4) : null
    var posts = this.state.posts ? this.state.posts.slice(currPage*12,(currPage+1)*12) : null
    var link =
      "https://poshangyan.s3.ap-south-1.amazonaws.com/niti-aayog-logo.png";
    var back =
      "https://poshangyan.s3.ap-south-1.amazonaws.com/30MPYUVANGO1.jpg";
      let post=null,them=null,popVid=null;
    if(posts) post = posts.map(pos => <SingleComponent post={pos} fromPos='true' key={pos.postId} /> )
    if(post && posts.length==0) post = <NoPostFound />
    if(themeOfTheMonth) them = themeOfTheMonth.map(pos => <SingleComponent post={pos} key={pos.postId} /> )
    if(popularVideos) popVid = popularVideos.map(pos => <SingleComponent post={pos} key={pos.postId} /> )


    var themeArray = [],
      langsArray = [],
      mediaTypeArray = [],
      sourceArray = [],
      AudiuanceArray = [];

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
      "Millet Free ",
      "Food Fortication ",
      "Girls Education, Diet & Right Age of Marriage",
      "Poshan Pakhwada"
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

    let option = <Grid columns={6} 
    style={{   height:'80%' , marginLeft: "5%", width: "90%",    backgroundImage: `url(${rext})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'  }} 
    divided>
      <Grid.Row>
      {/* <img src={rext} alt="14" style={{width:'100%',height:40,objectFit:'cover'}} /> */}

    <Grid.Column width={2} >
          <ReactMultiSelectCheckboxes
          style={{ width:10 }}
          placeholderButtonLabel="Theme"
          options={themeArray}
          onChange={this.handleThemeChange}
        />
    </Grid.Column>
    
    <Grid.Column width={3}>
    <ReactMultiSelectCheckboxes
        style={{ width: "18%" }}
        placeholderButtonLabel="Language"
        options={langsArray}
        onChange={this.handleLanguageChange}
      />
    </Grid.Column >

    

    <Grid.Column width={3}>
      <ReactMultiSelectCheckboxes
        style={{ width: "18%" }}
        placeholderButtonLabel="Media Type"
        options={mediaTypeArray}
        onChange={this.handleMediaTypeChange}
        />
    </Grid.Column>

    <Grid.Column width={4}>
    <ReactMultiSelectCheckboxes
        style={{ width: "18%" }}
        placeholderButtonLabel="Target Audiuance"
        options={AudiuanceArray}
        onChange={this.handleAudienceChange}
      />
    </Grid.Column>

    <Grid.Column width={3}>
    <ReactMultiSelectCheckboxes
        style={{ width: "18%" }}
        placeholderButtonLabel="Source"
        options={sourceArray}
        onChange={this.handleSourceChange}
      />
    </Grid.Column>
    <Grid.Column width={1} >
    <input type="image" 
      src={go} style={{
        height: 40,
        position: "absolute",
        marginTop: "-2px",
        right: "2px"
      }} 
      alt="go"
      onClick={this.handleFilter}
      />
    </Grid.Column>
  </Grid.Row>
    </Grid>
    return (
      <div>
        {/* <Fab>
        <Progress percent={this.state.percentDownloaded} style={{width:'100%',height:10}} indicating />
        </Fab> */}
        <Paper
          variant="outlined"
          style={{
            width: "100%"
          }}
        >
          <span>
            
            <img src={link} style={{ height: 50, margin: 4 }} alt="logo" />
          </span>
          <span style={{ float: "right", marginRight: 10, marginTop: 20 }}>
            <h4>Sign Up</h4>
          </span>
        </Paper>
        <div></div>

        <div style={{ height: 270, position: "relative", overflow: "visible" }}>
          <div className="centered">
            <center>
            <p
              style={{
                color: "white",
                maxWidth: "100%",
                align: "center"
              }}
            >
              <h3
                style={{
                  fontSize: "2.4vw",
                  paddingLeft: "20%",
                  paddingRight: "20%",
                  marginBottom:10
                }}
              >
                Use this repository to educate tourself on all the nutrition
                information. To keep yourself and your loved ones safe and
                healthy.
              </h3>
              {/* <img src={rect} style={{ width: "90%" }} alt="rect" /> */}
            </p> 
            </center>

            <p
              style={{
                // fontSize: "2.8vw",
                paddingLeft: "5%",
                paddingRight: "5%"
              }}
            >
              {option}
            </p>
          </div>
          <img
            style={{ width: "100%", maxHeight: 270, objectFit: "cover" }}
            src={back}
            alt="poster"
          />
        </div>
        <div style={{ background: "#DEE3D0" }}>
         { !this.state.here? <center>
            
            <h1 style={{ paddingTop: 10 }}><em>Theme of the month</em></h1>
            <MuiGrid container style={{ padding: 10 }} spacing={3}>
              {them}
            </MuiGrid>
          </center> :null}
          <center>
            
            <h1 style={{marginTop:10}} ><em>Most Downloaded Media</em></h1>
            <MuiGrid container style={{ padding: 10 }} spacing={3}>
              {post}
            </MuiGrid>
            <Pagination
               boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
                style={{margin:10}}
                onClick={this.handlePageChange}
            />
          </center>
        </div>
        <div style={{ padding: 20, position: "relative" }}>
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
        </div>
      </div>
    );
  }
}

export default Feed;
