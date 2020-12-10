import React , {useState,useEffect} from 'react'
import styled from "styled-components"
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import {Link} from "react-router-dom"
const Div = styled.div`
display:none!important;
@media screen and (max-width:768px){
display:block!important;
}
.btn-grps{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    background:white;
    display:flex;
    z-index:1000;
    .sort-btn{
        border-right:1px solid #ededed;
    }
    &>div{
        width:100%;
        padding:15px 0;
        text-align:center;
        cursor:pointer;
    }
}
.popup{
    position:fixed;
    background:white;
    z-index:1001;
    width:100%;
    transition:0.3s ease;
    .popup-head{
        padding:15px 15px;
        font-size:1.1em;
        font-weight:600;
        display:flex;
        justify-content:space-between;
        box-shadow: 0px 2px 14px 0px rgba(50, 50, 50, 0.2);
        z-index:2;
        position:relative;
        .close{
            cursor:pointer;
        }
    }
    &.sort{
        bottom:${props=> props.sort };
        .popup-body{
            height:120px;
        }   
        .sort-btn{
            padding:15px;
            display: flex;
            align-items: center;
            label{
                padding-left:10px;
            }
        } 
        .apply-btn{
            background:#2680eb;
            color:white;
            padding:15px 0;
            text-align:Center;
            width:100%;
            display:block;
        }
    }
    &.filter{
        bottom:${props=> props.filter };
        .popup-body{
            height:400px;
            display:flex;
            .col-1{
                background:#e8e8e8;
                width:250px;
                height:100%;
                .filter-btn{
                    padding:10px 15px;
                    cursor:pointer;
                }
            }
            .col-2{
                width:100%;
                .filter-selects{
                    padding:10px 15px;
                    cursor:pointer;
                }
                .custom-dropdown>div:nth-of-type(2)>div{
                    max-height:346px;
                    & div{
                        min-width:100%;
                    }
                }
                &>div{
                    height:100%;
                    &>div:nth-of-type(1){
                        postion:relative!important;
                        margin:0px!important;
                        border-radius:0;
                        height:100%;
                        width:100%;
                        z-index:0!important;
                    }
                    &>div:nth-of-type(2),&>button{
                        display:none !important;
                    }
                }
            }
        }
        .popup-btns{
            display:flex;
            &>div{
                padding:15px 0;
                text-align:Center;
                width:100%;
                cursor:pointer;
            }
            .apply-btn{
                background:#2680eb;
                color:white;
                padding:15px 0;
                text-align:Center;
                width:100%;
            }
        }
    }
}
.
`
const SortFilterBtn = ({query}) => {
    const [params,setParams] =  useState(query)
    const [url,setUrl] = useState("")
    const [activeTab,setActiveTab] = useState("Language")
    const [isFilterOpen,setIsFilterOpen] = useState(false)
    const [isSortOpen,setIsSortOpen] = useState(false)
    const [sort,setSort] = useState("")
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
        //  console.log(params)
        //  if(query[label]&&query[label].length)
        //      temp = query[label].map(a => {return {label:a,value:a} })
        for( var key in params){
            if(label === key){
                temp = [...params[key].map(a => {return {label:a,value:a}})]
            } 
        }   
        // console.log(temp,'temp')
         return temp;
    }
    const handleFilterChange = (label) =>{
        setActiveTab(label)
    }
    const handleSortChange = (label) =>{
        const temp = {...params};
                temp.sort=[label]
             setParams(temp)
    }

      return (
         <Div filter={isFilterOpen? "0":"-500px"} sort={isSortOpen? "0":"-250px"} >
             <div className="popup filter" >
                 <div className="popup-head">
                     Filter
                     <i className="close icon" onClick={()=> setIsFilterOpen(false)}></i>
                 </div>
                 <div className="popup-body">
                        <div className="col-1">
                            {
                                dropData.map((data,i) =>(
                                    <div className="filter-btn" onClick={(e) => handleFilterChange(data.label,e)} key={i+"tab1"} style={data.label==activeTab?{cursor:'auto',background:"white"}:null}>
                                        {data.label}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-2">
                            {
                                dropData.map((data,i) =>(
                                    data.label==activeTab?
                                        <ReactMultiSelectCheckboxes
                                            placeholderButtonLabel={data.label}  
                                            options = { sortMenuTab(data.options) } 
                                            defaultValue ={ setDefaultValue(data.label) } 
                                            onChange = {e=> UrlCreater(e,data.label)}
                                            menuIsOpen={true}
                                            className="custom-dropdown"
                                            key={i+'select'}
                                        />
                                        :null
                                ))
                            }
                        </div>
                 </div>
                 <div className="popup-btns">
                    <div className="clear-btn" onClick={()=> { setParams({}) }}>Clear</div>
                    <Link to={url}  className="apply-btn" onClick={()=>{setIsFilterOpen(false)}}>Apply</Link>
                 </div>
             </div>
             <div className="popup sort" >
                 <div className="popup-head">
                     Sort
                     <i className="close icon" onClick={()=> setIsSortOpen(false)}></i>
                 </div>
                 <div className="popup-body">
                       <div className="sort-btn"><input type="radio" name='sort' value = 'most-downloaded'  onChange={()=>  handleSortChange('download')}/><label htmlFor='most-downloaded'>Most Downloaded</label></div>
                       <div className="sort-btn"><input type='radio' name='sort' value = 'latest' onChange={()=>  handleSortChange('date')}/><label htmlFor='latest'>Latest</label></div>
                 </div>
                 <div className="popup-btns">
                    <Link to={url}  className="apply-btn" onClick={()=>{setIsFilterOpen(false)}}>Apply</Link>
                 </div>
             </div>
             <div className="btn-grps">
                 <div className="sort-btn"  onClick={()=> setIsSortOpen(!isSortOpen)}>Sort</div>
                 <div className="filter-btn" onClick={()=> setIsFilterOpen(!isFilterOpen)}>Filter</div>
             </div>
         </Div>
     )
}

export default SortFilterBtn

const dropData=[
  {
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
            'MDWS',
            'FSSAI',
            'others',
          ]
    }
]