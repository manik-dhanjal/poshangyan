import React, { Component } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { v4 as uuidv4 } from "uuid";
import { Progress } from 'semantic-ui-react'
import styled from "styled-components"
// import entire SDK
import AWS from "aws-sdk";
// import individual service
import S3 from "aws-sdk/clients/s3";

const Div = styled.div`
.heading-2{
  margin-top:10px;
  margin-bottom:10px;
}
.upload{
  display:flex;
  justify-content:start;
  &>div{
    margin:20px 0;
    margin-top:30px;
    margin-bottom:15px;
    width:50%;
    h4{
      margin-bottom:20px;
    }
  }
}
`
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
      source: "Others",
      label: "",
      mediaType: "Others",
      name: "Admin",
      snackbarType: 0,
      targetAudience: [],
      percentCompleted: 0,
      all_themes: [],
      all_languages: [],
      all_mediaType: [],
      all_mimetype: [],
      all_targetAudience: [],
      all_sources: [],
    };
  }
  componentDidMount() {
    axios.get('/getSortingData')
      .then(res => {
        console.log(res.data)
        let dat = res.data;
        console.log(dat)
        this.setState({
          all_themes: dat.themes,
          all_languages: dat.languages,
          all_mediaType: dat.mediaType,
          all_mimetype: dat.mimetype,
          all_targetAudience: dat.targetAudience,
          all_sources: dat.sources,
        })
      })
      .catch((e) => {
        console.log(e);
      })
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
      // postId: uuidv4(),
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
    AWS.config.update({region: process.env.REACT_APP_REGION});

    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION
    });

    if (file && proceed) {
      let c = file.name;
      let extension = c.split(".")[c.split(".").length - 1];
      c = c.split(".");
      c = c.slice(0, c.length - 1).join(" ");
      let showFileName = c;
      let ID = newPosts.label.toLowerCase().split(' ').join("-")
      newPosts.postId = ID;

      const params = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: file.name,
        Body: file, // optional
        ContentType: file.type // required
      };

      
      newPosts.mimetype = file.type;
      s3.upload(params)
        .on("httpUploadProgress", (progressEvent, response) => {
          const percent = parseInt(
            (100 * progressEvent.loaded) / progressEvent.total
          );
          this.setState({
            percentCompleted: percent
          });
          console.log(response)
        })
        .send((error, data) => {
          if (error) {
            console.log(error)
          } else {
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
              c = c.split(".");
              c = c.slice(0, c.length - 1).join(" ");
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
                  } else {
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
    console.log(newPost)
    axios
      .post("/upload", newPost)
      .then((res) => {
        console.log(res.data);
        this.setState({
          snackbarType: 1
        });
        setTimeout(function () {
          // window.location.reload(1);
        }, 5000); // After 5 secs
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          snackbarType: 2
        });
      });
  };
  render() {
    // const Feed = useRef(null);
    var blog = "";
    var themeArray = [],
      langsArray = [],
      sourceArray=[];
    const { all_languages, all_mediaType, all_sources, all_targetAudience, all_themes } = this.state;

    all_themes.sort();
    all_languages.sort();

    for (var i = 0; i < all_themes.length; i++) {
      themeArray.push({
        key: i,
        text: all_themes[i],
        value: all_themes[i]
      });
    }
    for (var i = 0; i < all_languages.length; i++) {
      langsArray.push({
        key: i,
        text: all_languages[i],
        value: all_languages[i]
      });
    }
    var targetArray = [];
    for (var i = 0; i < all_targetAudience.length; i++) {
      targetArray.push({
        key: i,
        text: all_targetAudience[i],
        value: all_targetAudience[i]
      });
    }
    for (var i = 0; i < all_sources.length; i++) {
      sourceArray.push({
        key: i,
        text: all_sources[i],
        value: all_sources[i]
      });
    }
    var link = "https://poshan-gyan.s3.ap-south-1.amazonaws.com/dataFeed.png";
    let per = this.state.percentCompleted == 0 ? null : this.state.percentCompleted;

    let sources = all_sources.map((val,i) => <option value={val} key={"op"+i}>{val}</option>)
    let mediaType = all_mediaType.map((val) => <option value={val} key={"opd"+i}>{val}</option>)

    // if(per) let pro =  
    // if(per==100) pro=null;
    return (
      <Div className="root">
        <h2 className="heading-2">Add New Post</h2>
        <hr />
        <div className="upload">
          <div className = "upoload-file">
            <h4> Upload File </h4>
            <form id="formData">
              <input type="file" id="file" className = "custom-file-input" ref={(ref) => this.fileUpload = ref} />
            </form>
          </div>
          <div className="upload-thumb">
            <h4>Upload Thumbnail </h4>
            <form id="formData2">
              <input type="file" id="file2" className = "custom-file-input" ref={(ref) => this.thumbUpload = ref} />
            </form>
          </div>
        </div>
        {  (per && !((per == 0) || (per == 100))) ? <Progress style={{ width: '100%' }}
          percent={this.state.percentCompleted} indicating progress /> : (null)}
        {/* <Input
          style={{ width: "100%", marginTop: 15 }}
          onChange={this.handleNameChange}
          placeholder="Your Name"
        /> */}
        <Input
          style={{ width: "100%", marginTop: 15 }}
          onChange={this.handleLabelChange}
          placeholder="Name"
        />
        <Dropdown
          placeholder="Theme"
          fluid
          multiple
          search
          selection
          style={{ marginTop: 15 }}
          options={themeArray}
          onChange={this.handleThemeChange}
        />
        <Dropdown
          placeholder="Language"
          fluid
          multiple
          search
          selection
          style={{ marginTop: 15 }}
          options={langsArray}
          onChange={this.handleLangChange}
        />
        <Dropdown
            placeholder="Source"
            fluid
            search
            selection
            style={{ marginTop: 15 }}
            options={sourceArray}
            onChange={this.handleSourceChange}
          />
        {/* <Input
          icon="folder open outline"
          iconPosition="left"
          list="source"
          onChange={this.handleSourceChange}
          style={{ width: "100%", marginTop: 15 }}
          placeholder="Source"
        />
        <datalist id="source">
          {sources}
          <option value="Social Media">Social Media</option>
        </datalist> */}
        {/* <Input
          list="Media Type"
          style={{ width: "100%", marginTop: 1}}
          onChange={this.handleMediaTypeChange}
          placeholder="Media Type"
        />
        <datalist id="Media Type">
          {mediaType}
        </datalist>  */}
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


        <div style={{  marginBottom: 50 }}>
          <Button
            inverted
            style={{ maxWidth:150,width:"50%", marginTop: 20, marginBottom: 1 }}
            color="green"
            onClick={this.handleSubmit}
          >
            Upload
          </Button>
          <h4 >{per}</h4>
        </div>
        <Snackbar open={this.state.snackbarType === 1} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            File successfully uploaded!!
        </Alert>
        </Snackbar>
        <Snackbar open={this.state.snackbarType === 2} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
            Please fill all fields!
        </Alert>
        </Snackbar>
      </Div>
    )
  }
}

export default Feed;
