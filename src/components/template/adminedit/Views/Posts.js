import React,{useEffect,useState} from "react";
import axios from "axios";
import styled from 'styled-components';

const Div = styled.div`

`

const Posts = () => {
  const [allPost,setAllPost] = useState([]);
  const [filteredPost,setFilteredPost] = useState([]);
  useEffect(() => {
    (async()=>{
      try{
        const posts = await axios.post("/getFilteredInfo")
        setAllPost(posts.data);
      }
      catch(e){
        console.log('error occured while fetching all post')
      }
    })()
  }, [])
  useEffect(()=>{
    setFilteredPost(allPost);
    console.log(allPost)
  },[allPost])
  return (
    <Div>
       <div className='Search-cont'>
            <input type='text' placeholder='Search'/>
            <button>search</button>
        </div>
        <div classname='show-post'>
          {console.log(filteredPost.length?filteredPost[0]:null)}
          {
            // filteredPost?filteredPost.map((post)=>{
              <div className='single-post'>
                <div className='img'>{filteredPost.length?filteredPost[0].label:null}</div >
              </div>
              // console.log(post)
            // }):null
          }
        </div>
    </Div>
  )
}

export default Posts

