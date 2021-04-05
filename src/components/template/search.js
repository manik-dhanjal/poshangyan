import React ,{useEffect, useState}from 'react'
import styled from "styled-components"
import Banner from "../organism/banner"
import SearchResult from "../organism/search-results"
const Div = styled.div`
background:#f4d6cc;
`
const searchTreat = (queryString) =>{
    const stage = {}
    // const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
        for(const entry of entries) {
         
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
            <Banner query={query}><h1>{query.Themes && query.Themes.length==1?query.Themes:"SEARCH RESULTS"}</h1></Banner>
            <SearchResult query={query}/>
        </Div>
    )
}

export default Search
