import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import play from '../../assets/Images/play.png' 
import{ Link }from "react-router-dom"
import audioThumb from "../../assets/Images/audio-thumbnail.png"
import {useAddCart,useCheckItemInCart} from '../context/cart.context'
import {createDownloadLink,initiatDownload,handleDownload} from "../../api/file-manager"
import ReactGA from "react-ga"
const Div = styled.div`
max-width:280px;
width:100%;
margin:20px 10px;
display:flex;
flex-direction:column;
align-items:center;
    .card-thumbnail{
      box-shadow:         5px 5px 18px 0px rgba(50, 50, 50, 0.1);
      position:relative;
      border-radius:8px;
      overflow:hidden;
      object-fit:cover;
      object-position:center;
      position:relative;
      width:100%;
      height:180px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:15px;
      .theme-tag{
        background:${({tagColor}) => tagColor};
        padding:2px 12px;
        font-size:0.9em;
        color:black;
        position:absolute;
        top:10px;
        right:10px;
        max-width:150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius:3px;
        color:white;
      }
        play-btn{
            width:30px;
            width:30px;
        }
    }
    .link{
      width:100%;
    }
    .label{
        font-size:1.1em;
        margin-bottom:10px;
        text-align:center;
        color:black;
        min-height:2.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .ui.animated.button {
        background: rgb(340,66,94);
        color: white;
    }
    .add-to-cart-btn{
        margin:0 5px;
    }
    
    .button{
      display:flex;
    }
       
`
const slugCreater = (str) =>{

        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return str.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
}
const tagColor = (themes) =>{
    const char = themes.toLowerCase().charCodeAt(0) - 97;
    var color ;
if(themes.includes("Overall Nutrition")||themes.includes("Anaemia")||themes.includes("ANC")) color =  "rgb(97,199,201)" ;
else if (themes.includes("Immunization")||themes.includes("Girls Education")||themes.includes("Food Fortication"))  color = "rgb(79,149,208)";
else if (themes.includes("Diarrhoea Management")||themes.includes("Sanitation/ WASH")||themes.includes("Breastfeeding"))   color = "rgb(235,98,97)";
else color = "rgb(239,82,135)";

 return color;
}


const Cards = ({post}) => {
    const {label,images,files,_id,themes,link} = post;
    const [lastDownloaded,setLastDownloaded] = useState({
          id:'',
          items:[],
          status:''
    });
    const addToCart = useAddCart()
    const isItemInCart = useCheckItemInCart()(post._id);
    const thumbnail = !link&&files[0].mimetype=="audio"?audioThumb:images[0].location
    const youtubeLink = link?link.includes('youtu.be'):false;
    const handleCardDownload =async (file,_id) => {
        if(file.length===1){
          setLastDownloaded({...lastDownloaded,status:'pending'});
          try{
            const url = await handleDownload(file[0].key,_id)
            setLastDownloaded({...lastDownloaded,status:'success'});
            ReactGA.event({
              category: 'Creative Downloaded',
              action: `creative with ${themes} theme downloaded`,
            });
          }catch(e){
            setLastDownloaded({...lastDownloaded,status:'failed'})
          }
          return 0;
        }
        if(lastDownloaded.status==='success'){  
          initiatDownload( lastDownloaded.id ); 
          return 0;
        }

      const listOfKeys = files.map(file=> file.key)
      createDownloadLink(listOfKeys,lastDownloaded,setLastDownloaded)
    }
    
    return (
        <Div tagColor={tagColor(themes)}>
          {
            link&&!youtubeLink?(
              <a href={link} target='_blank' className="link">

                  <div className="card-thumbnail" style={{background:`center / cover no-repeat url(${thumbnail})`}}>
                      <div className="theme-tag">{themes}</div>
                  </div>
                   <div className="label"> {label} </div> 
                </a>
            )
            :(
              <Link to={slugCreater(post.themes)+'/'+post.postId} className="link">

                <div className="card-thumbnail" style={{background:`center / cover no-repeat url(${thumbnail})`}}>
                    <div className="theme-tag">{themes}</div>
                  { youtubeLink||files[0].mimetype=="video"? <img src={play} className="play-btn"/> :null }
                </div>
                <div className="label"> {label} </div> 
              </Link>
            )
          }
                {
                  !link?<div className='button'>
                        <Button 
                          onClick={() =>handleCardDownload(files,_id)} 
                          animated 
                          disabled={lastDownloaded.status==='pending'} 
                          loading={lastDownloaded.status==='pending'}
                        >
                             <Button.Content visible>
                                  {lastDownloaded.status!=='failed'?'Download':'Try again'}
                              </Button.Content>
                            {
                              lastDownloaded.status!=='pending'?
                              
                              <Button.Content hidden>
                                  <Icon name='download' inverted />
                              </Button.Content>:
                              null
                            }
                        </Button>
                        <Button onClick={() => addToCart(post)} animated disabled = {isItemInCart} className='add-to-cart-btn'>
                            <Button.Content visible > {!isItemInCart?'Add To Cart':'Added'}</Button.Content>
                        
                              <Button.Content hidden>
                              { !isItemInCart? 
                                  <i className="shopping cart icon"></i>
                                  :<i className="check icon"></i>
                              }    
                              </Button.Content>

                        </Button>
                      </div>
                      :null
                }
                
        </Div>
    )
}

export default Cards
