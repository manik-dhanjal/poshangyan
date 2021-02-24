const SortingData = require('../schema/sortingDataSchema')
const Posts = require('../schema/postSchema')

const _id = "5fdc8d8b5a653314f841c32e"
exports.getSortingData = (req, res) => {
    SortingData.findById(_id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({ message: "Not Found" });
        })
}
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}
function makeArrayUnique(a) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        if (arr.indexOf(a[i]) == -1) {
            arr.push(a[i]);
        }
    }
    return arr;
}
exports.delFromSortingData = (req, res) => {
    const { type, val } = req.body;
    let new_value;
    SortingData.findById(_id)
        .then(data => {
            switch (type) {
                case 'languages':
                    new_value = removeItemAll(data.languages, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.languages = new_value;
                    updatePostsAfterDeletion(type, val);
                    break;
                case 'themes':
                    new_value = removeItemAll(data.themes, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.themes = new_value;
                    updatePostsAfterDeletion(type, val);
                    break;
                case 'mediaType':
                    new_value = removeItemAll(data.mediaType, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.mediaType = new_value;
                    updatePostsAfterDeletion(type, val);
                    break;
                case 'mimetype':
                    new_value = removeItemAll(data.mimetype, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.mimetype = new_value;
                    break;
                case 'targetAudience':
                    new_value = removeItemAll(data.targetAudience, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.sources = new_value;
                    updatePostsAfterDeletion(type, val);
                    break;
                case 'sources':
                    new_value = removeItemAll(data.sources, val);
                    if (new_value.length == 0) new_value.push('Other')
                    data.sources = new_value;
                    updatePostsAfterDeletion(type, val);
                    break;
            }
            return data.save();

        }).then((dat) => {
            res.status(200).send(dat);
        })
        .catch(e => {
            console.log(e)
            res.status(500).send({ err: "Something went wrong!!" })
        })
}
// type : 'themes','langs' etc
// val:  ''
// new_val: ''
exports.modifySortingData = (req, res) => {

    var case1 = false;  //adding
    var case2 = false;  //editing


    const { type, val, new_val } = req.body;

    console.log({ type, val, new_val })

    if (req.body.new_val) case2 = true;
    else case1 = true;

    SortingData.findById(_id)
        .then(data => {
            switch (type) {
                case 'languages':
                    if (case1) {
                        data.languages.push(val);
                        data.languages = makeArrayUnique(data.languages);
                    } else {
                        for (var j = 0; j < data.languages.length; j++) {
                            if (data.languages[j] === val) {
                                data.languages[j] = new_val;
                                break;
                            }
                        }
                        data.languages = makeArrayUnique(data.languages);
                        data.markModified('languages');
                        update(type, val, new_val);
                    }
                    break;
                case 'themes':
                    if (case1) {
                        data.themes.push(val);
                        data.themes = makeArrayUnique(data.themes);
                    } else {
                        for (var j = 0; j < data.themes.length; j++) {
                            if (data.themes[j] === val) {
                                data.themes[j] = new_val;
                                break;
                            }
                        }
                        data.themes = makeArrayUnique(data.themes);
                        data.markModified('themes');
                        update(type, val, new_val);
                    }
                    break;
                case 'mediaType':
                    if (case1) {
                        data.mediaType.push(val);
                        data.mediaType = makeArrayUnique(data.mediaType);
                    } else {
                        for (var j = 0; j < data.mediaType.length; j++) {
                            if (data.mediaType[j] === val) {
                                data.mediaType[j] = new_val;
                                break;
                            }
                        }
                        data.mediaType = makeArrayUnique(data.mediaType);
                        data.markModified('mediaType');
                        update(type, val, new_val);
                    }
                    break;
                case 'mimetype':
                    if (case1) {
                        data.mimetype.push(val);
                        data.mimetype = makeArrayUnique(data.mimetype);
                    } else {
                        for (var j = 0; j < data.mimetype.length; j++) {
                            if (data.mimetype[j] === val) {
                                data.mimetype[j] = new_val;
                                break;
                            }
                        }
                        data.mimetype = makeArrayUnique(data.mimetype);
                    }
                    break;
                case 'targetAudience':
                    if (case1) {
                        data.targetAudience.push(val);
                        data.targetAudience = makeArrayUnique(data.targetAudience);
                    } else {
                        for (var j = 0; j < data.targetAudience.length; j++) {
                            if (data.targetAudience[j] === val) {
                                data.targetAudience[j] = new_val;
                                break;
                            }
                        }
                        data.targetAudience = makeArrayUnique(data.targetAudience);
                        data.markModified('targetAudience');
                        update(type, val, new_val);
                    }
                    break;
                case 'sources':
                    if (case1) {
                        data.sources.push(val);
                        data.sources = makeArrayUnique(data.sources);
                    } else {
                        for (var j = 0; j < data.sources.length; j++) {
                            if (data.sources[j] === val) {
                                data.sources[j] = new_val;
                                break;
                            }
                        }
                        data.sources = makeArrayUnique(data.sources);
                        data.markModified('sources');
                        update(type, val, new_val);
                    }
                    break;
            }
            //console.log(data.languages,"BR")
            return data.save();
        })
        .then((dat) => {
           // console.log(dat.languages,"AR")
            res.status(200).send(dat);
        })
        .catch(e => {
            res.status(404).send({ message: "Not Found" });
        })
}
function update(type, val, new_val) {
    console.log(type, val, new_val)
    if (type && val && new_val) {
        switch (type) {
            case 'languages':
                Posts.find()
                    .then(dat => {
                        dat.forEach(element => {
                            // if(element.languages.)
                            var temp_val = element.languages.replace(val, new_val);
                            let old_val = element.languages
                            element.languages = temp_val
                            // console.log({new_val,old_val})
                            element.save();
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case 'themes':
                Posts.find()
                    .then(dat => {
                        dat.forEach(element => {
                            // if(element.languages.)
                            var temp_val = element.themes.replace(val, new_val);
                            let old_val = element.themes
                            element.themes = temp_val
                            // console.log({new_val,old_val})
                            element.save();
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case 'mediaType':
                Posts.find()
                    .then(dat => {
                        dat.forEach(element => {
                            // if(element.languages.)
                            var temp_val = element.mediaType.replace(val, new_val);
                            let old_val = element.mediaType
                            element.mediaType = temp_val
                            // console.log({new_val,old_val})
                            element.save();
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case 'mimetype':
                console.log("You can't cange theme mimetype🙁")
                break;
            case 'targetAudience':
                Posts.find()
                    .then(dat => {
                        dat.forEach(element => {
                            // if(element.languages.)
                            var temp_val = element.targetAudience.replace(val, new_val);
                            let old_val = element.targetAudience
                            element.targetAudience = temp_val
                            // console.log({new_val,old_val})
                            element.save();
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case 'sources':
                Posts.find()
                    .then(dat => {
                        dat.forEach(element => {
                            // if(element.languages.)
                            var temp_val = element.source.replace(val, new_val);
                            let old_val = element.source
                            element.source = temp_val
                            // console.log({new_val,old_val})
                            element.save();
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
        }
    }
}
exports.addSortingData = (req, res) => {
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
        'Others',
        "FSSAI",
        "MDWS",
        "Arogya World",
        "BBC Media Action",
        "Global Health Media",
        "JEEVIKA",
        "PATH",
        "Save The Children",
        "Sneha",
        "Tata Trust",
        "UNICEF India",
        "USAID",
        "WeCan",
        "Vitamin Angels",
        "Alive & Thrive"
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

    res.send({ message: "Already Added" })


}

function updatePostsAfterDeletion(type, val) {
    switch (type) {
        case 'languages':
            Posts.find()
                .then(posts => {
                    posts.forEach(post => {
                        // console.log(post.languages)
                        if (post.languages.includes(val)) {
                            let temp_val = post.languages.split(',');
                            console.log(temp_val)
                            removeItemAll(temp_val, val)
                            if (temp_val.length == 0) temp_val.push('Others');
                            temp_val = makeArrayUnique(temp_val);
                            console.log(temp_val)
                            let new_val = temp_val.join(',');
                            post.languages = new_val;
                            console.log(new_val)
                            post.save();
                        }
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            break;
        case 'themes':
            Posts.find()
                .then(posts => {
                    posts.forEach(post => {
                        // console.log(post.themes)
                        if (post.themes.includes(val)) {
                            let temp_val = post.themes.split(',');
                            console.log(temp_val)
                            removeItemAll(temp_val, val)
                            if (temp_val.length == 0) temp_val.push('Others');
                            temp_val = makeArrayUnique(temp_val);
                            console.log(temp_val)
                            let new_val = temp_val.join(',');
                            post.themes = new_val;
                            console.log(new_val)
                            post.save();
                        }
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            break;
        case 'mediaType':
            Posts.find()
                .then(posts => {
                    posts.forEach(post => {
                        // console.log(post.languages)
                        if (post.languages.includes(val)) {
                            let temp_val = post.languages.split(',');
                            console.log(temp_val)
                            removeItemAll(temp_val, val)
                            if (temp_val.length == 0) temp_val.push('Others');
                            temp_val = makeArrayUnique(temp_val);
                            console.log(temp_val)
                            let new_val = temp_val.join(',');
                            post.languages = new_val;
                            console.log(new_val)
                            post.save();
                        }
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            break;
        case 'mimetype':
            break;
        case 'targetAudience':
            Posts.find()
                .then(posts => {
                    posts.forEach(post => {
                        // console.log(post.targetAudience)
                        if (post.targetAudience.includes(val)) {
                            let temp_val = post.targetAudience.split(',');
                            console.log(temp_val)
                            removeItemAll(temp_val, val)
                            if (temp_val.length == 0) temp_val.push('Others');
                            temp_val = makeArrayUnique(temp_val);
                            console.log(temp_val)
                            let new_val = temp_val.join(',');
                            post.targetAudience = new_val;
                            console.log(new_val)
                            post.save();
                        }
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            break;
        case 'sources':
            Posts.find()
                .then(posts => {
                    posts.forEach(post => {
                        // console.log(post.languages)
                        if (post.source.includes(val)) {
                            let temp_val = post.source.split(',');
                            console.log(temp_val)
                            removeItemAll(temp_val, val)
                            if (temp_val.length == 0) temp_val.push('Others');
                            temp_val = makeArrayUnique(temp_val);
                            console.log(temp_val)
                            let new_val = temp_val.join(',');
                            post.source = new_val;
                            console.log(new_val)
                            post.save();
                        }
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            break;
    }

}