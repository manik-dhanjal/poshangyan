import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import {useCart,useDeleteCart} from '../../context/cart.context'
import { Button, Icon } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import Styles from "./cart.styles"
import {createDownloadLink,initiatDownload} from "../../../api/file-manager"
import downloadGA from "../../../api/GA/content-downloaded.GA"

 const CartDrop = ({state,cart,deleteFromCart,setCartDropOpen}) =>{
    const [lastDownloaded,setLastDownloaded] = useState({
         id:'',
         items:[],
         status:'success'
    });
    const currentCartItems = useCart()
  
const  downloadAll = async () => {
        const cartItemsKey = []
       if(currentCartItems<=0) return 0;
        currentCartItems.forEach((item)=>{
            downloadGA(item)
            item.files.forEach(file => cartItemsKey.push(file.key))
        })
            if( JSON.stringify( cartItemsKey) !== JSON.stringify( lastDownloaded.items )){
                   await createDownloadLink( cartItemsKey,lastDownloaded,setLastDownloaded );
            }
            else{
                initiatDownload( lastDownloaded.id );
            }
            setCartDropOpen(false);
    }
    const handleClearBtn = () => {
        deleteFromCart('','DeleteAll');
        setCartDropOpen(false);
    }
     return(
        <Styles state = {state}>
            <div className='head'>
                <h4>Cart</h4>
                <span className='clear' onClick={handleClearBtn}>Clear All</span>
            </div>
            <hr/>
                {lastDownloaded.status==='failed'?<p className='failed-message'>Try Again</p>:null}
                <div className='card-container'>
                   
                    {
                        cart.map((item,i) => (
                            <div className = 'card' key={i+'cart'}>
                                <div className='img-cont'>
                                    <img src = {item.images[0].location}/>
                                </div>
                                <div className = 'content'>
                                    <p>{item.label}</p>
                                        <span onClick={() => deleteFromCart(item._id,'DeleteOne')} className='close-btn'>
                                            <i className="close icon"></i>
                                        </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <hr/>
                <Button animated disabled={!currentCartItems.length} onClick={downloadAll}  >
                    <Button.Content visible   >Download All</Button.Content>
                        <Button.Content hidden>
                            <Icon name='download' inverted />
                    </Button.Content>
                </Button>     
                   {
                    lastDownloaded.status==='pending'?
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer> 
                    :null
                   }       
        </Styles>
     )
 }

 export default CartDrop; 