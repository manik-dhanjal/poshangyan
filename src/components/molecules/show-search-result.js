import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
const Div = styled.div`
display:flex;
flex-wrap:wrap;
align-items:Center;
justify-content:center;
margin-bottom:60px;
gap:30px;
.search-theme{
    color:grey;
    font-size:1.2em;
    .head{
        weight:600;
        color:black;
        margin-right:10px;
    }
}
.search-filter{
    display:flex;
    align-items:Center;
    
    .head{
        font-size:1.2em;
        margin-right:10px;
    }
    .clear-all-btn{
        color:rgb(340,66,94);
        margin-left:10px;
        font-size:1.2em;
        cursor:pointer;
    }
    .list{
        min-width:300px;
        width:100%;
        max-width:300px;
        min-height:30px;
        background:#dfddc3;
        border-radius:5px;
        display:flex;
        align-items:center;
        padding:5px;
        .filter-btn{
            border-radius:3px;
            background:white;
            padding:5px 8px;
            border:none;
            cursor:pointer;
            font-size:1.1em;
            color:black;
            .close{
                font-size:0.8em;
            }
        }
    }
}
`

// const filterButtonCreator = (query) =>{
// console.log(query)
// for (const temp in query){
//     console.log(temp)
//     query[temp].forEach(()=>{

//     })
// }
// }
const ShowSearchResult = ({query,postNo=0}) => {
    
    return (
        <Div>
            <div className="search-theme"><span className="head">Search: </span> {postNo} results found for {query.Themes?query.Themes.map((a,i) =>{ return  (i? "  ,":"") + a } ):"All Themes"}</div>
            {/* <div className = "search-filter">
                <span className="head">Filter: </span>
                <div className="list">
                    {filterButtonCreator(query)}
                    <Link className="filter-btn" to = {{ pathname: '/search', search: "?Themes=Ante Natal Care (ANC)"}} >name <i className="close icon"></i></Link>
                </div>
                <span className="clear-all-btn">Clear All</span>
            </div>    */}
        </Div>
    )
}

export default ShowSearchResult
