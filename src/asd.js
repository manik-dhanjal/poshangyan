import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";
import { Button, Dropdown, Header, Input } from "semantic-ui-react";
import { Paper, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Player } from "video-react";
import rect from "./Images/Rectangle1.png";
import "./App.css";
// import entire SDK
import AWS from 'aws-sdk';
// import individual service
import S3 from 'aws-sdk/clients/s3';
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
      content: "",
      hidden: true,
      themes: [],
      languages: [],
      source: "unknown",
      label: "",
      mediaType: "",
      snackbarType: 0
    };
  }
  getPriview = () => {
    this.setState({ hidden: false });
  };
  getconfirm = () => {
    // this.setState({hidden:false});
  };
  handleThemeChange = (e, data) => {
    // console.log(data.value);
    this.setState({ themes: data.value });
  };
  handleLangChange = (e, data) => {
    // console.log(data.value);
    this.setState({ languages: data.value });
  };
  handleSourceChange = (e, data) => {
    // console.log(data.value);
    this.setState({ source: data.value });
  };

  handleMediaTypeChange = (e, data) => {
    // console.log(data.value);
    this.setState({ mediaType: data.value });
  };
  handleLabelChange = (e, data) => {
    this.setState({ label: data.value });
    // console.log(data.value);
  };
  handleClose = () => {
    this.setState({ snackbarType: 0 });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.postScream({ body: this.state.body });
    // const image = event.target.files[0];
    //send to server
    const formData = document.getElementById("file");

    formData.append("themes", this.state.themes);
    formData.append("languages", this.state.languages);
    formData.append("label", this.state.label);
    formData.append("source", this.state.source);
    formData.append("mediaType", this.state.mediaType);
    //  console.log(formData);
    // console.log(JSON.stringify(Object.fromEntries(formData)));
  };
  render() {
    // const Feed = useRef(null);
    var blog = "";
    var themeArray = [],
      langsArray = [];

    var themes = [
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
      "Any"
    ];
    themes.sort();
    langs.sort();

    for (var i = 0; i < themes.length; i++) {
      themeArray.push({
        key: i,
        text: themes[i],
        value: themes[i]
      });
    }
    for (var i = 0; i < langs.length; i++) {
      langsArray.push({
        key: i,
        text: langs[i],
        value: langs[i]
      });
    }
    var link =
      "https://poshangyan.s3.ap-south-1.amazonaws.com/niti-aayog-logo.png";
    var l =
      "https://poshangyan.s3.ap-south-1.amazonaws.com/AI_in_Healthcare.pdf";
    var back =
      "https://poshangyan.s3.ap-south-1.amazonaws.com/30MPYUVANGO1.jpg";
    return (
      <div className="root">
        <Paper
          variant="outlined"
          style={{
            width: "100%"
          }}
        >
          <span>
            {" "}
            <img src={link} style={{ height: 50, margin: 4 }} alt="logo" />
          </span>
          <span style={{ float: "right", marginRight: 10, marginTop: 20 }}>
            <h4>Sign Up</h4>
          </span>
        </Paper>
        <div></div>

        <div style={{ height: 270, position: "relative", overflow: "hidden" }}>
          <center className="centered">
            <p
              style={{
                color: "white",
                maxWidth: "100%",
                align: "center"
              }}
            >
              <h3
                style={{
                  fontSize: "2.8vw",
                  paddingLeft: "20%",
                  paddingRight: "20%"
                }}
              >
                Use this repository to educate tourself on all the nutrition
                information. To keep yourself and your loved ones safe and
                healthy.
              </h3>
              <img src={rect} style={{ width: "90%" }} alt="rect" />
              <div style={{ width: "90%" }}>
                <span id="ASD" style={{ width: "20%" }}>
                  Theme
                </span>
                <span id="ASD"></span>
                <span id="ASD"></span>
                <span id="ASD"></span>
                <span></span>
              </div>
            </p>
          </center>
          <img
            style={{ width: "100%", minheight: 270 }}
            src={back}
            alt="poster"
          />
          <img
            style={{ width: "100%", minheight: 270 }}
            src={back}
            alt="poster"
          />
        </div>
        <div style={{ background: "#DEE3D0", height: 80 }}></div>
      </div>
    );
  }
}

export default Feed;
