import React from 'react'
import { Container } from "@material-ui/core"
import styled from 'styled-components'
import {useCart,useDeleteCart} from '../context/cart.context'
import { Button, Icon } from 'semantic-ui-react'
import handleDownload from "../../api/aws-handle-download"

const Div = styled.div`
background:#f4d6cc;
padding:50px 0;
&>div{
    display:flex!important;
    .card-container{
        width:100%;
        padding-right:50px;
        .card{
            width:100%;
            background:white;
            border-radius:10px;
            padding: 20px;
            margin-bottom:20px;
            display:flex;
            column-gap:20px;
            height:150px;
            max-width:700px;
            .img-cont{
                width:150px;
                border-radius:10px;
                overflow:hidden;
                img{
                    height:100%;
                    width:100%;
                    object-fit:cover;
                }
            }
            .content{
                button{
                    margin-top:15px;
                }
            }
        }
    }
    .checkout-col{
        max-width:400px;
        width:40%;
        background:grey;
    }
}
`
const Cart = () => {
    const cart = useCart();
    const deleteFromCart = useDeleteCart()

    return (
        <Div>
            <Container>
                <div className='card-container'>
                    {
                        cart.map((item,i) => (
                            <div className = 'card' key={i+'cart'}>
                                <div className='img-cont'>
                                     <img src = {item.thumbLocation||item.Location}/>
                                </div>
                                <div className = 'content'>
                                    <h3>{item.label}</h3>
                                    <div>{item.themes}</div>
                                    <div className='buttons'>
                                        {/* <Button onClick={() => handleDownload(item.Location,item.Key,item._id)} animated >
                                            <Button.Content visible >Download</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='download' inverted />
                                            </Button.Content>
                                        </Button> */}
                                        <Button onClick={() => deleteFromCart(item._id)} animated >
                                            <Button.Content visible >Remove</Button.Content>
                                            <Button.Content hidden>
                                                 <i className="trash alternate outline icon"></i>
                                            </Button.Content>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <div className = 'checkout-col'>
                    
                </div> */}
            </Container>
        </Div>
    )
}
 export default Cart
