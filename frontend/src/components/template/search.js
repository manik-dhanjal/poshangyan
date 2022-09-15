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
    const [query,setQuery] = useState({
        status:false,
        data:null
    })
    useEffect(()=>{
        setQuery({
            status:true,
            data:searchTreat(props.location.search)
        })
    },[props.location.search])
    return (
        <Div>
            {
                query.status?
                <>
                    <Banner query={query.data}><h1>{query.data.Themes && query.data.Themes.length==1?query.data.Themes:"SEARCH RESULTS"}</h1></Banner>
                    <SearchResult query={query.data}/>
                </>
                :null
            }

        </Div>
    )
}

export default Search
