import React, { Component } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuidv4 } from "uuid";
import {  Progress } from 'semantic-ui-react'
// import entire SDK
import AWS from "aws-sdk";
// import individual service
import S3 from "aws-sdk/clients/s3";

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
      source: "others",
      label: "",
      mediaType: "",
      name: "Anshaj Kumar",
      snackbarType: 0,
      targetAudience: [],
      percentCompleted: 0
    };
  }

  handleThemeChange = (e, data) => {
    // console.log(data.value);
    this.setState({
      themes: data.value
    });
  };
  handleLangChange = (e, data) => {
    // console.log(data.value);
    this.setState({
      languages: data.value
    });
  };
  handleSourceChange = (e, data) => {
    // console.log(data.value);
    this.setState({
      source: data.value
    });
  };
  handleClose = () => {
    this.setState({
      snackbarType: 0
    });
  };
  handleMediaTypeChange = (e, data) => {
    // console.log(data.value);
    this.setState({
      mediaType: data.value
    });
  };
  handleLabelChange = (e, data) => {
    this.setState({
      label: data.value
    });
    // console.log(data.value);
  };
  handleNameChange = (e, data) => {
    this.setState({
      name: data.value
    });
    // console.log(data.value);
  };
  handleAudienceChange = (e, data) => {
    this.setState({
      targetAudience: data.value
    });
    // console.log(data.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults;
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // console.log(percentCompleted);
        // this.setState({percentCompleted})
      }.bind(this)
    };

    const file = this.fileUpload.files[0];
    const thumb = this.thumbUpload.files[0];
    const newPosts = {
      createdAt: new Date().toISOString(),
      postId: uuidv4(),
      themes: this.state.themes.toString(),
      languages: this.state.languages.toString(),
      label: this.state.label.toString(),
      source: this.state.source.toString(),
      mediaType: this.state.mediaType.toString(),
      dataAddedBy: this.state.name.toString(),
      targetAudience: this.state.targetAudience.toString(),
      downloadsCount: 0
    };
    let proceed = true;
    if (
      newPosts.languages === "" ||
      newPosts.themes === "" ||
      newPosts.label === "" ||
      newPosts.source === "" ||
      newPosts.mediaType === "" ||
      newPosts.dataAddedBy === ""
    ) {
      this.setState({
        snackbarType: 2
      });
      proceed = false;
    }
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION
    });
    if (file && proceed) {
      let c = file.name;
      let extension = c.split(".")[c.split(".").length - 1];
      c = c.split(".")[0];
      let showFileName = c;

      const params = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: file.name,
        Body: file, // optional
        ContentType: file.type // required
      };
      // console.log(file)
      newPosts.mimetype = file.type;
      s3.upload(params)
        .on("httpUploadProgress", (progressEvent, response) => {
          const percent = parseInt(
            (100 * progressEvent.loaded) / progressEvent.total
          );
          this.setState({
            percentCompleted: percent
          });
        })
        .send((error, data) => {
          if (error) {
            // console.log(error)
          }else{
          // console.log(data);
          // newPosts.ETag = data.ETag;
          newPosts.Location = data.Location;
          newPosts.key = data.key;
          newPosts.Key = data.Key;
          newPosts.Bucket = data.Bucket;
          newPosts.showFileName = showFileName;
          if (thumb && proceed) {
            let c = thumb.name;
            let extension = c.split(".")[c.split(".").length - 1];
            c = c.split(".")[0];
            const params = {
              Bucket: process.env.REACT_APP_BUCKET_NAME,
              Key: thumb.name,
              Body: thumb, // optional
              ContentType: thumb.type // required
            };
            s3.upload(params)
              .on("httpUploadProgress", (progressEvent, response) => {
                const percent = parseInt(
                  (100 * progressEvent.loaded) / progressEvent.total
                );
                this.setState({
                  percentCompleted: percent
                });
              })
              .send((error, data) => {
                if (error) {
                  // console.log(error)
                }else{
                  // console.log(data);
                  // newPosts.thumbETag = data.ETag;
                  newPosts.thumbLocation = data.Location;
                  newPosts.thumbkey = data.key;
                  newPosts.thumbKey = data.Key;
                  newPosts.thumbBucket = data.Bucket;
                  newPosts.thumbshowFileName = c;
                  this.post(newPosts);
                }
              });
            
          } else {
            this.post(newPosts);
          }
        }
        });
    } else {
      this.setState({
        snackbarType: 2
      });
      proceed = false;
    }
  };
  post = (newPost) => {
    axios
      .post("/upload", newPost)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          snackbarType: 1
        });
        setTimeout(function () {
          // window.location.reload(1);
        }, 5000); // After 5 secs
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          snackbarType: 2
        });
      });
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
      "Millet",
      "Complementary Feeding",
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
    var target = ['Children under 5','Adolescent Girls',' Mothers','Pregnant Women','PRI member','other']
    var targetArray = [];
    for (var i = 0; i < target.length; i++) {
      targetArray.push({
        key: i,
        text: target[i],
        value: target[i]
      });
    }
    var link = "https://poshangyan.s3.ap-south-1.amazonaws.com/dataFeed.png";
    let per = this.state.percentCompleted == 0 ? null : this.state.percentCompleted; 

    // if(per) let pro =  
    // if(per==100) pro=null;
    return (
      <div className="root">
        <p style={{ textAlign: "center", marginTop: 40, marginBottom: 20 }}>
          <img src={link} alt="Feed" style={{ maxWidth: "80%" }} />
        </p>
        <hr />
        <p style={{ textAlign: "center", marginTop: 40, marginBottom: 40 }}>
          <form id="formData">
            <input type="file" id="file" ref={(ref) => this.fileUpload = ref} />
          </form>
        </p>
        <p style={{ textAlign: "center", marginTop: 40, marginBottom: 40 }}>
          
          <form id="formData2">
            <input type="file" id="file2" ref={(ref) => this.thumbUpload = ref} />
          </form>
          <p style={{marginLeft:-60,marginTop:5}} > Preview Image </p>
        </p>
      {  (per && !((per==0) || (per==100))) ?   <Progress style={{height:10,width:'100%'}} 
      percent={this.state.percentCompleted} indicating /> : (null) }
        <Input
          style={{ width: "100%", marginTop: 10 }}
          onChange={this.handleNameChange}
          placeholder="Your Name"
        />
        <Input
          style={{ width: "100%", marginTop: 10 }}
          onChange={this.handleLabelChange}
          placeholder="Label"
        />
        <Dropdown
          placeholder="Select Theme"
          fluid
          multiple
          search
          selection
          style={{ marginTop: 10 }}
          options={themeArray}
          onChange={this.handleThemeChange}
        />
        <Dropdown
          placeholder="Select Language"
          fluid
          multiple
          search
          selection
          style={{ marginTop: 10 }}
          options={langsArray}
          onChange={this.handleLangChange}
        />
         
        <Input
          icon="folder open outline"
          iconPosition="left"
          list="source"
          onChange={this.handleSourceChange}
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Data Source"
        />
        <datalist id="source">
          <option value="MoHFW">MoHFW</option>
          <option value="MoWCD">MoWCD</option>
          <option value="others">others</option>
          {/* <option value="Social Media">Social Media</option> */}
        </datalist>
        <Input
          list="Media Type"
          style={{ width: "100%", marginTop: 10 }}
          onChange={this.handleMediaTypeChange}
          placeholder="Media Type"
        />
        <datalist id="Media Type">
          <option value="IPC">IPC</option>
          <option value="Mass Media">Mass Media</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Social Media">Social Media</option>
        </datalist>
        <Dropdown
          placeholder="Target Audience"
          fluid
          multiple
          search
          selection
          style={{ marginTop: 10 }}
          options={targetArray}
          onChange={this.handleAudienceChange}
        />
        
        
        <div style={{ textAlign: "center",marginBottom:50 }}>
          <Button
            inverted
            style={{ width: "50%", marginTop: 20, marginBottom: 1 }}
            color="green"
            onClick={this.handleSubmit}
          >
            Green
          </Button>
            <h4 >{per}</h4>
        </div>
        <Snackbar open={this.state.snackbarType===1} autoHideDuration={3000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success">
          File successfully uploaded!!
        </Alert>
      </Snackbar>
      <Snackbar open={this.state.snackbarType===2} autoHideDuration={3000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="error">
          Please fill all fields!
        </Alert>
      </Snackbar>
      </div>
    )
  }
}

export default Feed;
