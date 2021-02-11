var AWS = require('aws-sdk');
AWS.config.loadFromPath('./utils/config.json');
var findRemoveSync = require('find-remove');

const fs = require('fs')
const join = require('path').join
const path = require('path')
const rimraf = require('rimraf')
const s3Zip = require('s3-zip')



const region = 'ap-south-1'
const bucket = 'poshangyan'
const folder = ''
const uuid = require('uuid')

const file1 = '02 - Nutrition_and_Hygiene_Hindi.png';
let fileList2 = [file1, '2-page Leaflet_5sutra_Hindi_31 Aug_Page_1.jpg', '3189 Unicief Poster 19x29inch-07.jpg'];
exports.zipAndDownload = (req, res) => {
    let file = uuid.v4() + '-zip.zip';
    createZip(file, req.body.list,res);
    // res.json({ download: '/share/' + file });
    // res.send({asd:'asd'})
}


function createZip(file,fileList,res) {
  const output = fs.createWriteStream(join(__dirname, 'public/share', file))
  console.log(output.path)
  s3Zip
    .archive({ region: region, bucket: bucket }, folder, fileList)
    .pipe(output)
  output.on('finish', () => {
    // console.log('All writes are now complete.');
    res.download(output.path);
  });
  output.on('error',(err)=>{
      console.log(err)
      res.send({message: "Something went wrong!!"})
  })
}