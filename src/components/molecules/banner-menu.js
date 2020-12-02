import React , {useState,useEffect} from 'react'
import styled from "styled-components"
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import go from "../../assets/Images/go.png";
import {Link} from "react-router-dom"
const Div = styled.div`
background : white;
border-radius : 100px;
display:flex;
padding:10px 20px;
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
    width:50px;
}
.select-cont>div>div:nth-of-type(1)>div>div:nth-of-type(2)>div {
    overflow-x: hidden;
   }
   
`


const BannerMenu = ({query={}}) => {
   const [params,setParams] =  useState(query)
   const [url,setUrl] = useState("")
   const UrlCreater = (e,name) =>{
     setParams({...params,[name]:[...e.map(a=>a.value)]})
    }
   useEffect(() => {
     const temp = "/search"
     if(    Object.keys(params).length === 0 ){

         setUrl(temp)
     }else{
        var query="?";
        for(var key in params){
            if(query!=="?") query+="&";
            var array = params[key].map((elem,i) =>  elem  )
            query+=`${key}=${array}`
        }
        setUrl(temp+query)
     }
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
                         <ReactMultiSelectCheckboxes placeholderButtonLabel={menu.label}  options={ sortMenuTab(menu.options) } defaultValue={ setDefaultValue(menu.label)} onChange={e=>UrlCreater(e,menu.label)}/>
                    </div>
                )
                })}
            </div>
            <div className="submit-btn">
              <a href={url}><input type="image"  src={go} style={{ height: 40 }} alt="go"  /></a>
            </div>
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
            "Millet",
            "Food Fortication ",
            "Girls Education, Diet & Right Age of Marriage",
            "Poshan Pakhwada",
            "Complementary Feeding"
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
            'IPC',
            'Mass Media',
            'Outdoor',
            'Social Media'
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
            'others',
          ]
    }
]

