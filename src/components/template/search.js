import React from 'react'
import styled from "styled-components"
import Banner from "../organism/banner"
import SearchResult from "../organism/search-results"
const Div = styled.div`
background:rgb(234,231,199);
`
const searchTreat = (raw) =>{
    //? and & removed and converted to array where break point is &
    const stage1=raw.substring(1).split("&");

    const stage2={};
   stage1.map(cat=>{
        var key = cat.substr(0, cat.indexOf('=')).replace(/%20/g,"");
        stage2[key] =  cat.substr(cat.indexOf('=')+1,cat.length).replace(/%20/g," ").split(',');
    })
    return stage2;
}

const Search = (props) => {
    const query = searchTreat(props.location.search);
    return (
        <Div>
            <Banner query={query}>{query.Themes && query.Themes.length==1?query.Themes[0].replace(/\s/g,"-").toUpperCase():"SEARCH RESULTS"}</Banner>
            <SearchResult query={query}/>
        </Div>
    )
}

export default Search
