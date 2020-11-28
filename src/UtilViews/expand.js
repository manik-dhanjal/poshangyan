import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Icon, Table } from 'semantic-ui-react'
import '../App.css'
import axios from 'axios'
import {  Redirect } from 'react-router-dom';

import { useHistory   } from "react-router";

function ModalExampleModal(props) {
  const [open, setOpen] = React.useState(false)
  const [reDir, setreDir] = React.useState(false)
  const myWebSite = 'https://www.poshangyan.com/?postId=';
  const history = useHistory();
 
  const removeQuery = (...queryNames) => {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    queryNames.forEach(q => delete location.query[q]);
    browserHistory.push(location);
  };
 
const downloadImage = (filename) => {
  const s3 = new AWS.S3({
   accessKeyId: process.env.REACT_APP_ACCESS_ID,
   secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
   signatureVersion: 'v4',
   region: 'ap-south-1'
 });
let url = s3.getSignedUrl('getObject', {
  Bucket: process.env.REACT_APP_BUCKET_NAME , Key: filename,
  Expires: 300,
  ResponseContentDisposition :  `attachment; filename=${filename}`
})
// .then((err,data)=>{
//   console.log(data)
  let link = document.createElement("a");
       link.href = url;
       link.setAttribute('download', filename);
      //  link.setAttribute('target', '_blank');
        link.click();
// })

console.log({data:url,asd:'asd'})
       
}
const handleDownload = () => {
  let url=props.post.Location
  let filename= props.post.Key
  addDownloadCount();
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  downloadImage(filename)
}
const addDownloadCount = () => {
  axios
    .post("/adddownload",{
      "_id":props.post._id
    })
    .then((res) => {
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err);
    });
}
let Redir = <Redirect to="/" />;
if(!reDir) Redir = null; 
var back=null ;
   if(props.post && props.post.thumbLocation) back=props.post.thumbLocation;
   else if(props.post && !back) back = props.post.Location; 
let downloadBtn = <Button onClick={handleDownload} animated 
style={{background:'#EF5287',
marginTop: 4}} >
<Button.Content visible style={{ color: 'white' }} >Download</Button.Content>
<Button.Content hidden>
  <Icon name='download' inverted />
</Button.Content>
</Button>
  return (
    <Modal

      onClose={() => {
        // window.location.href = "http://foo.com/error.php";
      //   history.replace({
      //     pathname: '/',
      //    search: '?'
      //  })
        setOpen(false)
      }}
      onOpen={() => {
        setreDir(false)
        setOpen(true)
        if(props.post)
      history.replace({
         pathname: '/',
        search: '?postId='+props.post._id
      })
      }}
      open={open}
      trigger={
    <img
                    src={back}
                    alt="asd"
                    style={{
                      objectFit: "cover",
                      
                      objectPosition: "center",
                      height: 200,
                    }}
                    className="thumbnail"
                  />
    }
    >
      {Redir}
      <Modal.Header>Expanded View
      
        
        <Icon name='close' onClick={() => {setOpen(false); history.replace({
         pathname: '/',
         })  
      }} style={{float:'right'}} />
      
       </Modal.Header>
      <Modal.Content image>
        <Image size='medium' style={{height:'auto',width:400,objectFit:'cover'}}  
        src={props.post.thumbLocation ? props.post.thumbLocation : props.post.Location} wrapped />
        <Modal.Description>
  <Header><h2>{props.post.label}</h2></Header>
          <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>Information</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell >
          <Icon name='themeisle' /> Theme
        </Table.Cell>
        <Table.Cell>{props.post.themes}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='language' /> Language
        </Table.Cell>
        <Table.Cell>{props.post.languages}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='file' /> Type
        </Table.Cell>
        <Table.Cell>{props.post.mimetype}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='feed' /> Source
        </Table.Cell>
        <Table.Cell>{props.post.source}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='download' /> Downloads
        </Table.Cell>
        <Table.Cell>{props.post.downloadsCount}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  <div>
  <a href={"https://www.facebook.com/sharer/sharer.php?u="+myWebSite+ props.post._id} target="_blank" rel="noopener">
    <Button circular color='facebook' icon='facebook' />
</a>
    <Button circular color='twitter' icon='twitter' />
    <Button circular color='linkedin' icon='linkedin' />
    <Button circular color='google plus' icon='google plus' />
  </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {downloadBtn}
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal
