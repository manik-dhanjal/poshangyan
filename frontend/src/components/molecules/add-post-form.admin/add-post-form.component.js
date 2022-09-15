import React, { useState } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import {useCategories} from "../../context/post.context"
import Styles from "./add-post-form.styles"

const AddPostForm = ({handleSubmit}) => {
    const [addPostData,setAddPostData] = useState({
        label:'',
        themes:'',
        languages:'',
        targetAudience:'',
        source:''
    })
    const rawCategories = useCategories();
    const handleInputChange = (e) =>{
        setAddPostData({...addPostData,[e.target.name]:e.target.value})
        console.log(addPostData)
    }
    const handleDropChange = (e,data) =>{
        setAddPostData({...addPostData,[data.name]:data.value.toString()})
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
          label:"Themes",
          name:"themes",
          options: rawCategories.status==="success"? sortMenuTab(rawCategories.data.themes):[]
        },  
        {
            label:"Languages",
            name:"languages",
            options: rawCategories.status==="success"? sortMenuTab(rawCategories.data.languages):[]
         }
        ,{
            label:"Target Audience",
            name:"targetAudience",
            options: rawCategories.status==="success"?sortMenuTab(rawCategories.data.targetAudience):[]
        },{
            label:"Source",
            name:"source",
            options: rawCategories.status==="success"?sortMenuTab(rawCategories.data.sources):[]
        }
    ]
    const handleLocalSubmit = () => {
        handleSubmit(addPostData,setAddPostData)
    }
    const setDefaultValue = (e) =>{
        return addPostData[e]?addPostData[e].split(','):[]
    }
    return (
        <Styles>
                <Input onChange={handleInputChange} placeholder="Name" name='label'className='custom-input' value={addPostData.label} required/>
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
                                value={setDefaultValue(menu.name)} 
                                onChange={handleDropChange} 
                                name={menu.name}
                                className='custom-input'
                            />
                    </div>
                )
                })}
                <div className='submit-cont'>
                    <Button inverted color="green"  onClick={() => handleLocalSubmit()}>
                        Add Post
                    </Button>
                </div>
        </Styles>
    )
}

export default AddPostForm
