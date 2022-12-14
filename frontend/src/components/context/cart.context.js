import React ,{useState,useContext,useEffect} from 'react'

const GetCartContext = React.createContext()
const AddCartContext = React.createContext()
const DeleteCartContext = React.createContext()
const CheckItemInCart =  React.createContext()

export function useCart() { return useContext( GetCartContext ) }
export function useAddCart() { return useContext( AddCartContext ) }
export function useDeleteCart() { return  useContext( DeleteCartContext ) }
export function useCheckItemInCart () {return useContext( CheckItemInCart )}
export const   CartProvider = ({children}) => {

    const [cart,setCart] = useState([]);
    useEffect(() => {

        if (typeof(Storage) !== "undefined") {
            const cartStore = localStorage.cartItem;
            if(cartStore)
                setCart( JSON.parse(cartStore) )

        } else {
           console.log('local storage is not supported error')
        }  
    }, [])
    useEffect(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.cartItem = JSON.stringify(cart);
        } else {
           console.log('local storage is not supported error')
        }  
    }, [cart])
    const addToCart = (post) =>{
            if(cart.reduce( (( result,item )=> item._id===post._id?false:result),true))
                setCart([...cart,post])
    }
    const ChangeCart = (id,action) =>{
        switch(action){
            case 'DeleteOne':{
                const temp = cart.reduce((finalArr,item)=> item._id!==id ? [...finalArr,item] : [...finalArr],[])
                setCart(temp)
                break;
            }
            case 'DeleteAll':{
                setCart([])
            }
        }
    }
    const checkItemInCart = (id) =>{
        return cart.reduce( (( result,item )=> item._id===id?true:result),false)
    }

    return (
        <GetCartContext.Provider value = {cart}>
                <AddCartContext.Provider value = {addToCart}>
                    <DeleteCartContext.Provider value = {ChangeCart}>
                        <CheckItemInCart.Provider value = {checkItemInCart}>
                            {children}
                        </CheckItemInCart.Provider>
                    </DeleteCartContext.Provider>
                </AddCartContext.Provider>
        </GetCartContext.Provider>
    )
}

