import React ,{useEffect, useState}from 'react'
import styled from "styled-components"
import Banner from "../organism/banner"
import SearchResult from "../organism/search-results"
const Div = styled.div`
background:rgb(234,231,199);
`
const searchTreat = (queryString) =>{
    const stage = {}
    // console.log(queryString)
    // const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
        for(const entry of entries) {
          console.log(`${entry[0]}: ${entry[1]}`);
         
            const key = entry[0].replace(/\s/g,"");
            const value = entry[1].split(',');
            stage[key] = value;
            if(!entry[1])  delete stage[key]
        }
    return stage;
}

const Search = (props) => {
    const [query,setQuery] = useState(searchTreat(props.location.search))
    useEffect(()=>{
        setQuery(searchTreat(props.location.search))
    },[props.location.search])
    return (
        <Div>
            <Banner query={query}>{query.Themes && query.Themes.length==1?query.Themes:"SEARCH RESULTS"}</Banner>
            <SearchResult query={query}/>
        </Div>
    )
}

export default Search
