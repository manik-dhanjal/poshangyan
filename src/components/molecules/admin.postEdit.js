import React,{useState,useEffect,useRef} from 'react'
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
import styled from 'styled-components'

const Div = styled.div`
.custom-input{
    width:100%;
    margin-bottom:15px;
}
.form{
    margin-top:50px;
}
`

const PostEdit = ({post,handleBackbutton}) => {
    const [editPostData,setEditPostData] = useState(post)

    useEffect(()=>{
        console.log(editPostData)
    })
    var slug = (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
      
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes
      
        return str;
      };
    const handleInputChange = (e) =>{
        setEditPostData({...editPostData,[e.target.name]:e.target.value})
    }
    const handleDropChange = (e,data) =>{
        console.log(data.name,editPostData)
        setEditPostData({...editPostData,[data.name]:data.value.toString()})
    }
    const setDefaultValue = (e) =>{
        const searchLabel = e.replace(/\s/,'').toLowerCase();

        for(var label in editPostData){
            if(label.toLowerCase()===searchLabel)
                    return editPostData[label].split(',')
        }

        return []
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setEditPostData({...editPostData,postId:slug(editPostData.label)})
        let key = localStorage.getItem('passkey');
        axios.put(`/posts/${editPostData._id}`,{...editPostData,passkey:key})
        .then(res=>{
            console.log(res.data)
        })
        .catch(e=>{
            console.log(e)
        })
        console.log(e)
    }
    const fileUpload = useRef(null)
    const thumbUpload = useRef(null)
    const sortMenuTab = (options) =>{
        var any = false;
        var other = false;
        var temp = [];  
         options.forEach(e=>{
            if(e === "Any") any=true
            if(e === "others") other=true;
            if(e !== "Any" && e !== "others")
             temp.push( {text:e,value:e} )
         })
         temp = temp.sort((a,b)=> ( '' + a.label).localeCompare(b.label) )
 
         if(any) temp.unshift({text:"Any",value:"Any"})
         if(other) temp.push({text:"others",value:"others"})
         return temp;
    }
    return (
        <Div>
            <Button onClick={handleBackbutton} className=''>Back</Button>
              
            <div className='form'>
{/* 
                    <form id="formData" className='custom-input'>
                        <input type="file" id="file" ref={fileUpload} />
                    </form>
                    
                    <form id="formData2" className='custom-input'>
                        <input type="file" id="file2" ref={thumbUpload} />
                    </form> */}

            {/* {  (per && !((per==0) || (per==100))) ?   <Progress style={{width:'100%'}} 
            percent={this.state.percentCompleted} indicating progress /> : (null) } */}
                <Input onChange={handleInputChange} placeholder="Name" name='label'className='custom-input' value={editPostData.label} required/>
                 {dropData.map( ( menu ,i) =>{
                return  (
                    <div className="select-cont" key={menu.label}>
                            <Dropdown 
                                placeholder={menu.label} 
                                fluid multiple 
                                required
                                search 
                                selection 
                                options={sortMenuTab(menu.options)} 
                                defaultValue={setDefaultValue(menu.label)} 
                                onChange={handleDropChange} 
                                name={menu.label}
                                className='custom-input'
                            />
                    </div>
                )
                })}
                <div className='submit-cont'>
                    <Button inverted color="green"  onClick={handleSubmit}>
                        Update
                    </Button>
                    {/* <h4 >{per}</h4> */}
                </div>
            </div>
                {/* <Snackbar open={this.state.snackbarType===1} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    File successfully uploaded!!
                </Alert>
            </Snackbar>
            <Snackbar open={this.state.snackbarType===2} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                Please fill all fields!
                </Alert>
            </Snackbar> */}
        </Div>
    )
}

export default PostEdit

const dropData=[
    {
        label:"themes",
        options: [
            "Ante Natal Care (ANC)",
            "Breastfeeding",
            "Anaemia Prevention",
            "Immunization",
            "Growth Monitoring",
            "Sanitation/ WASH",
            "Diarrhoea Management",
            "Diet Diversity/ Overall Nutrition",
            "Nutri Cereal",
            "Food Fortification",
            "Girls Education, Diet & Right Age of Marriage",
            // "Poshan Pakhwada",
            "Complementary Feeding",
            "Supplementation - Vit A",
            "Supplementation - Deworming"
          ]
    },{
        label:"languages",
        options:[
            "Any",
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
            "English",
            "Garo",
          ]
    },{
        label:"mediaType",
        options:[
            "Any",
            'IPC',
            'Mass Media',
            'Outdoor',
            'Social Media',
            'Others'
          ]
    },{
        label:"targetAudience",
        options:[
            "Any",
            'Children under 5',
            'Adolescent Girls',
            'Mothers',
            'Pregnant Women',
            'PRI member',
            'Civil society',
            'Others'
          ]
    },{
        label:"source",
        options:[
            "Any",
            'MoHFW',
            'MoWCD',
            'MDWS',
            'FSSAI',
            'Others',
          ]
    }
]
