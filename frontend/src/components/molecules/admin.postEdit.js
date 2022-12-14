import React,{useState,useEffect,useRef} from 'react'
import { Button, Dropdown, Input } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useCategories} from "../context/post.context"
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
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
    const rawCategories = useCategories();
    const [updateStatus,setUpdateStatus] = useState("");
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
        setUpdateStatus("pending")
        setEditPostData({...editPostData,postId:slug(editPostData.label)})
        let token = localStorage.getItem("auth-token");
        axios.put(`/posts/${editPostData._id}`,{...editPostData},{headers: { "x-auth-token": token },})
        .then(res=>{
            setUpdateStatus("success")
        })
        .catch(e=>{
            setUpdateStatus("failed")
            console.log(e)
        })
    }
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
    const dropData=[
      
          {
            label:"themes",
            options: rawCategories.status==="success"? sortMenuTab(rawCategories.data.themes):[]
        },  {
            label:"languages",
            options: rawCategories.status==="success"? sortMenuTab(rawCategories.data.languages):[]
        }
        //   ,{
        //       label:"Mime Type",
        //       options:rawCategories.status==="success"? sortMenuTab(rawCategories.data.mimetype):[]
        //   }
          ,{
              label:"target Audience",
              options: rawCategories.status==="success"?sortMenuTab(rawCategories.data.targetAudience):[]
          },{
              label:"source",
              options: rawCategories.status==="success"?sortMenuTab(rawCategories.data.sources):[]
          }
      ]
    return (
        <Div>
            <Button onClick={handleBackbutton} className=''>Back</Button>
              
            <div className='form'>
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
                                options={menu.options} 
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
            {
                    updateStatus==='pending'?
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer> 
                    :null
            }       
            <Snackbar open={updateStatus==="success"} autoHideDuration={3000} onClose={() => setUpdateStatus("")}>
                    <Alert onClose={() => setUpdateStatus("")} severity="success">
                    File successfully uploaded!!
                </Alert>
            </Snackbar>
            <Snackbar open={updateStatus==="failed"} autoHideDuration={3000} onClose={() => setUpdateStatus("")}>
                    <Alert onClose={() => setUpdateStatus("")} severity="error">
                Please fill all fields!
                </Alert>
            </Snackbar>
        </Div>
    )
}

export default PostEdit

