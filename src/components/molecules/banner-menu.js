import React , {useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components"
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const Div = styled.div`
background : white;
border-radius : 100px;
display:flex;
padding:10px 10px;
.menu{
    display:flex;
    align-items:center;
    width:100%;
    .select-cont{
        border-right:1px solid grey;
        display:flex;
        justify-content:center;
        width:100%;
        &:last-of-type{
            border:none;
        }
        &>div>div{
            left: calc(-128px + 50%);
        }
    }
}
.submit-btn{
    height: 40px;
    width: 40px;
    color: white;
    background: ${({to,now})=>to!==now?'rgb(340,66,94)':'#1cd11c'};
    border-radius: 50%;
    margin: 0;
    font-size: 1.2em;
    display: flex;
    padding-left: 2px;
    margin-left:15px;
}
div.submit-btn > i {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   }
   
.select-cont>div>div:nth-of-type(1)>div>div:nth-of-type(2)>div {
    overflow-x: hidden;
   }
   @media screen and (max-width:768px){
    width: 220px;
    margin: 0 auto;
    .submit-btn {
        margin-left: 0;
    }
    .select-cont{
        border:none!important;
    }
    .select-cont:not(:nth-of-type(1)){
        display:none!important;
    }
   }
`


const BannerMenu = ({query={}}) => {
   const [params,setParams] =  useState(query)
   const [url,setUrl] = useState("")
   const UrlCreater = (e,name) =>{
    const temp = {...params};
    // name==='Mime Type' ? name='mimetype' : null;
    const key = name.replace(/\s/g,'')
    
       if(!e.length){
           delete temp[key]
       }
       else
       {
            temp[key]=[...e.map(a=>a.value)]
       }
         setParams(temp)
    }
   useEffect(() => {
     var temp = "/search"
     if(  Object.keys(params).length ){
        temp += "?" + Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
     }
     setUrl(temp)
   }, [params])
   const sortMenuTab = (options) =>{
       var any = false;
       var other = false;
       var temp = [];  
        options.forEach(e=>{
           if(e.includes("All")) any=true
           if(e.includes("Others")) other=true;
           if(!e.includes("All") && !e.includes("Others"))
            temp.push( {label:e,value:e} )
        })
        temp = temp.sort((a,b)=> ( '' + a.label).localeCompare(b.label) )

        if(any) temp.unshift({label:options[0],value:options[0]})
        if(other) temp.push({label:options[options.length-1],value:options[options.length-1]})
        return temp;
   }

   const setDefaultValue = (label) =>{
        label = label.replace(/\s/g,"")
        var temp = [];
        if(query[label]&&query[label].length)
            temp = query[label].map(a => {return {label:a,value:a} })
        return temp;
   }
     return (
        <Div to={url} now={window.location.pathname+window.location.search}>
            <div className="menu">
                {dropData.map( ( menu ,i) =>{
                return  (
                    <div className="select-cont" key={i}>
                         <ReactMultiSelectCheckboxes 
                            placeholderButtonLabel={menu.label}  
                            options={ sortMenuTab(menu.options) } 
                            defaultValue={ setDefaultValue(menu.label)} 
                            onChange={e=>UrlCreater(e,menu.label)}
                         />
                    </div>
                )
                })}
            </div>
            <Link to={url}>
                <div className="submit-btn">
                   <i className="chevron right icon"></i>
                </div>
            </Link>
        </Div>
    )
}

export default BannerMenu

const dropData=[
    {
        label:"Themes",
        options: [
            "All themes",
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
            "Girls Health and Education",
            // "Poshan Pakhwada",
            "Complementary Feeding",
            "Vit A supplements",
            "Deworming"
          ]
    },{
        label:"Languages",
        options:[
            "All languages",
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
            "Garo"
          ]
    },{
        label:"Media Types",
        options:[
            'All media types',
            'PDF',
            'Video',
            'Audio',
            'Image',
            'GIF'
          ]
    },{
        label:"Target Audiences",
        options:[
            'All audiences',
            'Children under 5',
            'Adolescent Girls',
            'Mothers',
            'Pregnant Women',
            'PRI member',
            'Civil society',
            'Health workers and Others'
          ]
    },{
        label:"Sources",
        options:[
            'All sources',
            'MoHFW',
            'MoWCD',
            'MDWS',
            'FSSAI',
            'Arogya World',
            'BBC Media Action ',
            'Global Health Media ',
            'JEEViKA',
            'PATH',
            'Save The Children',
            'Sneha',
            'Tata Trust',
            'UNICEF India',
            'NITI Aayog',
            'USAID',
            'WeCan',
            'Vitamin Angels',
            'Alive & Thrive',
            'Others',
          ]
    }
]


