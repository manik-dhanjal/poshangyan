import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import {useCart,useDeleteCart} from '../context/cart.context'
import { Button, Icon } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const Drop = styled.div`
padding: 15px;
padding:${({state}) => state?'15px':'0 15px'};
position:absolute;
width:300px;
right:0;
top:100%;
z-index:801;
background:white;
min-height:${({state}) => state?'292px':'0'};
max-height:${({state}) => state?'292px':'0'};
overflow:hidden;
box-shadow: -2px 21px 53px -13px rgba(0,0,0,0.32);
border-radius: 0 0 5px 5px;
transition:0.4s ease;
    .card-container{
    height:175px;
    overflow-y:auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.head{
    display:flex;
    justify-content:space-between;
    h4{
        margin:0;
    }
    span{
        font-size:0.85em;
        color:rgb(340,66,94);
        cursor:pointer;
    }
}
.failed-message{
    background:#fdc6c6;
    border:1px solid red;
    text-align:Center;
    padding:5px 10px;
    border-radius:5px;
    margin:10px 0;
    color:red;
}
.card{
    display:grid;
    grid-template-columns:25% 75%;
    margin-bottom:20px;
    &:last-of-type{
        margin-bottom:0;
    }
    .img-cont{
        width:100%;
        height:50px;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
    }
    .content{
        display:flex;
        margin-left:15px;
        align-items:center;
        justify-content:space-between;
        p{
            margin:0;
        }
        .close-btn{
            margin-left:5px;
            transition:0.2s ease;
            cursor:pointer;
            &:hover{
                color:rgb(340,66,94);
            }
        }
    }
}

.ui.animated.button {
    background: rgb(340,66,94);
    color: white;
    float:right;
}
hr{
    color:rgb(340,66,94);
}
`
 const CartDrop = ({state,cart,deleteFromCart}) =>{
    const [lastDownloaded,setLastDownloaded] = useState({
         id:'',
         items:[],
         status:'success'
    });
    const currentCartItems = useCart()
    const createDownloadLink = async (cartItemKeys) => {
        console.log('getting download link')
        try{
                
                const response = await axios.post('/create-zip',{list:cartItemKeys});
                setLastDownloaded({id:response.data,items:cartItemKeys,status:'success'});
                initiatDownload( response.data );
        }
        catch(e){
            setLastDownloaded({...lastDownloaded,status:'failed'})
            console.log(e,'is error')
        }
    }
    const initiatDownload = async (fileName) => {
        console.log('download-initiated')
            const downloadUrl = 'https://poshangyan-backend.herokuapp.com/download-zip/'+fileName;
            // const downloadUrl =  'http://localhost:8080/download-zip/'+fileName;
            console.log(downloadUrl)
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download',fileName);
            link.click();
    }
    function downloadAll()  {

       let cartItemsKey = [];
       if(currentCartItems<=0) return 0;
       currentCartItems.forEach((item)=> cartItemsKey.push(item.Key))
            if( JSON.stringify( cartItemsKey) !== JSON.stringify( lastDownloaded.items )){
                    setLastDownloaded({...lastDownloaded,status:'pending'})
                    createDownloadLink( cartItemsKey );
            }
            else{
                initiatDownload( lastDownloaded.id );
            }
            
    }
     return(
        <Drop state = {state}>
            <div className='head'>
                <h4>Cart</h4>
                <span className='clear' onClick={() => deleteFromCart('','DeleteAll')}>Clear All</span>
            </div>
            <hr/>
                {lastDownloaded.status==='failed'?<p className='failed-message'>Try Again</p>:null}
                <div className='card-container'>
                   
                    {
                        cart.map((item,i) => (
                            <div className = 'card' key={i+'cart'}>
                                <div className='img-cont'>
                                    <img src = {item.thumbLocation||item.Location}/>
                                </div>
                                <div className = 'content'>
                                    <p>{item.label}</p>
                                        <span onClick={() => deleteFromCart(item._id,'DeleteOne')} class='close-btn'>
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
        </Drop>
     )
 }

 export default CartDrop; 