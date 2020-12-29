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
    background: rgb(340,66,94);
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
           if(e === "Any") any=true
           if(e === "others") other=true;
           if(e !== "Any" && e !== "others")
            temp.push( {label:e,value:e} )
        })
        temp = temp.sort((a,b)=> ( '' + a.label).localeCompare(b.label) )

        if(any) temp.unshift({label:"Any",value:"Any"})
        if(other) temp.push({label:"others",value:"others"})
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
        <Div>
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
            "Any",
            "Ante Natal Care (ANC)",
            "Breastfeeding",
            "Anaemia Prevention",
            "Immunization",
            "Growth Monitoring",
            "Sanitation/ WASH",
            "Diarrhoea Management",
            "Diet Diversity/ Overall Nutrition",
            "Nutri Cereal",
            "Food Fortication ",
            "Girls Education, Diet & Right Age of Marriage",
            "Poshan Pakhwada",
            "Complementary Feeding",
            "Supplementation - Vit A",
            "Supplementation - Deworming"
          ]
    },{
        label:"Language",
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
            "English"
          ]
    },{
        label:"Media Type",
        options:[
            'Any',
            'PDF',
            'Video',
            'Audio',
            'Image',
            'GIF'
          ]
    },{
        label:"Target Audience",
        options:[
            'Any',
            'Children under 5',
            'Adolescent Girls',
            'Mothers',
            'Pregnant Women',
            'PRI member',
            'Civil society',
            'others'
          ]
    },{
        label:"Source",
        options:[
            'Any',
            'MoHFW',
            'MoWCD',
            'MDWS',
            'FSSAI',
            'others',
          ]
    }
]


