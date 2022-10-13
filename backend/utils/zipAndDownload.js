var findRemoveSync = require('find-remove');

const fs = require('fs')
const join = require('path').join
const path = require('path')
const rimraf = require('rimraf')
const s3Zip = require('s3-zip')
const uuid = require('uuid')

const FOLDER = ''
const zip_dir=join(__dirname,'/../public/zips/');

exports.createZip = (req, res) => {

  let fileName = uuid.v4() + '-zip.zip';

    const output = fs.createWriteStream(join(zip_dir, fileName))
      s3Zip
      .archive({ region: process.env.PG_AWS_REGION, bucket: process.env.PG_AWS_BUCKET_NAME}, FOLDER, req.body.list)
      .pipe(output)
    output.on('finish', () => {
      res.status(200);
      res.send(fileName);
    });
    output.on('error',(err)=>{
      console.log(err)
        res.status(500)
        res.send(err+'error')
    })
}

exports.downloadZip = (req,res) => {
    res.download(join(zip_dir+ req.params.name));
} 


exports.checkZipFiles = (req,res) =>{

  fs.readdir(zip_dir, (err, files) => {
    if(err)
    {
      res.status(500)
      res.send(err+'error')
    }
    

    res.send(files+'files')
  });
}

var timeInSeconds = 1000*60*30

setInterval(function(){
  fs.readdir(zip_dir, function(err, files) {
    var first = false;
    files.forEach(function(file, index) {
      first?
      fs.stat(path.join(zip_dir, file), function(err, stat) {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        endTime = new Date(stat.ctime).getTime() + timeInSeconds;
        if (now > endTime) {
          return rimraf(path.join(zip_dir, file), function(err) {
            if (err) {
              return console.error(err);
            }
          });
        }
        
      })
      :first = true;
    });
  });
},timeInSeconds)