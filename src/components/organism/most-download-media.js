import React, {useEffect,useState,useMemo} from 'react'
import styled from "styled-components"
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import downloadedMediaApi from "../../api/allData.api"
import ViewAllBtn from "../atom/view-all-btn"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Div = styled.div`
padding:60px 0;
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
.message{
    text-align:center;
}
`
const MostDownloadMedia = ({post}) => {
    const slicedData = post.data.sort((a,b)=> b.downloadsCount-a.downloadsCount).slice(0,12)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows:false,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
              }
            }
          ]
      };
    return (
        <Div>
            <Container>
                <h2>Most Downloaded Media</h2>
                {

                }
                {
                    post.status==="pending"?
                        <h3 className="message">We Are Getting Your data ...</h3>
                       :(
                           post.status==="success"?
                            <Slider {...settings}>
                                { slicedData.map((a,i)=> <Cards post={a} key={i}/>) }
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
