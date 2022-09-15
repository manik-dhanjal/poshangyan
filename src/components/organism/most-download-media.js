import React, {useEffect,useState,useMemo} from 'react'
import styled from "styled-components"
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PreSearchPost from "../molecules/searching-post"
import axios from "axios"
const Div = styled.div`

background:white;
padding:60px 0;
.slick-prev{
  left:-40px;
}
.slick-next{
  right:-40px;
}
.arr{
  font-size:22px;
  background:#ff425e80;
  color:white;
  width:40px;
  height:40px;
  border-radius:50%;
  cursor:pointer;
  z-index:100;
  &::before{
    content:'';
    display:none;
  }
  .left {
    height: max-content;
    width: max-content;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding-right: 2px;
    padding-bottom: 2px;
   }
   .right{
    height: max-content;
    width: max-content;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding-left: 2px;
    padding-bottom: 2px;
   }
}

h2{
text-align:center;
margin:10px 0 20px 0;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
}
.slick-slide>div{
    display:flex;
    justify-content:center;
}
.slick-slider {
  margin: auto 40px;
 }
 
.message{
    text-align:center;
}
.arrange-me{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  &>div{
      justify-self:center;
  }
}
@media screen and (max-width:1024px){
.arrange-me{
      grid-template-columns:repeat(2,300px);
      justify-content:center;
      &>div{
        &:nth-of-type(4),:nth-of-type(3){
            display:none;
        }
  }
}
@media screen and (max-width:700px){
.arrange-me{
      grid-template-columns:repeat(1,1fr);
      &>div{
          &:nth-of-type(2){
              display:none;
          }
      }
  }
}

 
`
const NextArrow = ({onClick,className }) => {
  return (
    <div className={`${className} nextarr arr`} onClick={onClick}>
      <i className="chevron right icon"></i>
    </div>  
  );
}

const PrevArrow = ({ onClick,className }) => {
  return (
    <div className={`${className} prevarr arr`} onClick={onClick}>
      <i className="chevron left icon"></i>
    </div>  
  );
}
const MostDownloadMedia = () => {
  const [post,setPost] = useState({
    status:'',
    data:[]
  })
    const slicedData = post.data.sort((a,b)=> b.downloadsCount-a.downloadsCount).slice(0,12)
  useEffect(()=>{
    setPost({
      status:'pending',
      data:[]
    })
    axios.get('/most-downloaded')
    .then(response => {
      setPost({
        status:'success',
        data:response.data
      })
    })
    .catch(error => {
      console.log(error)
      setPost({
        status:'failed',
        data:[]
      })
    })
  },[])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
      };
    return (
        <Div>
            <Container>
                <h2>Most Downloaded Media</h2>
                {
                    post.status==="pending"?
                        <PreSearchPost dummy={4}/>
                       :(
                           post.status==="success"?
                            <Slider {...settings}>
                                { post.data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </Slider>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                 {/* <ViewAllBtn url="/search?sort=download"/> */}
            </Container>
        </Div>
    )
}

export default MostDownloadMedia
