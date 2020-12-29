const SortingData = require('../schema/sortingDataSchema')


// _id= 5fdc8d8b5a653314f841c32e(temp)
// _id= 5fdc906b0c4f19095cf6a31d(main)
const _id = "5fdc906b0c4f19095cf6a31d"
exports.getSortingData = (req,res) => {
    SortingData.findById(_id)
        .then(data=>{
            res.status(200).send(data);
        })
        .catch(e=>{
            res.status(400).send({message:"Not Found"});
        })
}

exports.modifySortingData = (req,res) =>{
    SortingData.findById(_id)
        .then(data=>{
            // res.status(200).send(data);
            if(req.body.themes){
                data.themes = req.body.themes
            }
            if(req.body.languages){
                data.languages = req.body.languages
            }
            if(req.body.targetAudience){
                data.targetAudience = req.body.targetAudience
            }
            if(req.body.source){
                data.source = req.body.source
            }
            if(req.body.mediaType){
                data.mediaType = req.body.mediaType
            }
            if(req.body.mimetype){
                data.mimetype = req.body.mimetype
            }
            return data.save();
        })
        .then((dat)=>{
            res.status(200).send(dat);
        })
        .catch(e=>{
            res.status(400).send({message:"Not Found"});
        })
}
exports.addSortingData = (req,res) => {
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
        "Millet",
        "Food Fortication ",
        "Complementary Feeding",
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

      var mimetype = [
          "Images",
          "PDFs",
          "Videos",
          "Audios",
          "GIFs"
      ];
      const srtDat = new SortingData();
      srtDat.themes = themes;
      srtDat.languages = langs;
      srtDat.mimetype = mimetype;
      srtDat.mediaType = mediaType;
      srtDat.targetAudience = targetAudience;
      srtDat.sources = source;

    //   srtDat.save().then((pos)=>{
    //     console.log(pos)
    //     res.status(200).send({received:pos})
    //   })

    res.send({message:"Already Added"})


}