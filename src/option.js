import React, { Component } from "react";
import { Button, Dropdown, Grid, Menu } from "semantic-ui-react";
import "./App.css";
import { Checkbox } from "semantic-ui-react";
import go from "./Images/go.png";
import rext from "./Images/Rectangle1.png";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from "axios";
export class options extends Component {
  constructor() {
    super();
    this.state = {
      themes: [],
      languages: [],
      mediaType: [],
      targetAudience: [],
      source: []
    };
  }
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

  handleFilter = () => {
    var data = {
      themes:this.state.themes.toString(),
      languages:this.state.languages.toString(),
      targetAudience:this.state.targetAudience.toString(),
      mediaType:this.state.mediaType.toString(),
      source:this.state.source.toString(),
    }
    // console.log(data)
    axios
      .get("/getPopolarVideos", formData)
      .then((res) => {
        // console.log(res.data);
        this.setState({popularVid:res.data});
        
      })
      .catch((err) => {
        // console.log(err);
        // 
      });
  }

  render() {
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

    
    return (
      <Grid columns={6} 
      style={{   height:'80%' ,     backgroundImage: `url(${rext})`,
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
    );
  }
}

export default options;
