import AWS from "aws-sdk";
import axios from 'axios';

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
        let link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', filename);
            link.click(); 
    } 
    const  addDownloadCount = (_id) => {
        axios.post("/adddownload",{
            "_id":_id
          })
          .then((res) => {
            console.log(res.data);
          })
          
      } 
      const  handleDownload = (Location,Key,_id) => {
        let url=Location
        let filename= Key
        addDownloadCount(_id);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        downloadImage(filename)
      }  

export default handleDownload
