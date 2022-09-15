var AWS = require('aws-sdk');
AWS.config.loadFromPath('./utils/config.json');
var findRemoveSync = require('find-remove');

const fs = require('fs')
const join = require('path').join
const path = require('path')
const rimraf = require('rimraf')
const s3Zip = require('s3-zip')



const region = 'ap-south-1'
const bucket = 'poshan-gyan'
const folder = ''
const uuid = require('uuid')

const file1 = '02 - Nutrition_and_Hygiene_Hindi.png';
let fileList2 = [file1, '2-page Leaflet_5sutra_Hindi_31 Aug_Page_1.jpg', '3189 Unicief Poster 19x29inch-07.jpg'];
exports.createZip = (req, res) => {

  let fileName = uuid.v4() + '-zip.zip';

    // createZip(file, req.body.list,res);
    const output = fs.createWriteStream(join(__dirname, 'public/share', fileName))
      // console.log(region,bucket)
      s3Zip
      .archive({ region: region, bucket: bucket}, folder, req.body.list)
      .pipe(output)
    output.on('finish', () => {
      res.status(200);
      res.send(fileName);
    });
    output.on('error',(err)=>{
      consol.log(err)
        res.status(500)
        res.send(err+'error')
        // res.send({message: "Something went wrong!!"})
    })
    // res.send(fileName);
}

exports.downloadZip = (req,res) => {
    res.download(__dirname+'/public/share/'+ req.params.name);
} 


exports.checkZipFiles = (req,res) =>{

  fs.readdir(__dirname+'/public/share', (err, files) => {
    if(err)
    {
      res.status(500)
      res.send(err+'error')
    }
    

    res.send(files+'files')
  });
}

var uploadsDir = __dirname + '/public/share';
var timeInSeconds = 1000*60*30

setInterval(function(){
  fs.readdir(uploadsDir, function(err, files) {
    var first = false;
    files.forEach(function(file, index) {
      first?
      fs.stat(path.join(uploadsDir, file), function(err, stat) {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        endTime = new Date(stat.ctime).getTime() + timeInSeconds;
        if (now > endTime) {
          return rimraf(path.join(uploadsDir, file), function(err) {
            if (err) {
              return console.error(err);
            }
            console.log('successfully deleted');
          });
        }
        
      })
      :first = true;
    });
  });
},timeInSeconds)