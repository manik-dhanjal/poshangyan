import axios from 'axios';
import React ,{useState,useContext,useEffect} from 'react'

const GetAllPostContext =  React.createContext()
const GetCategoriesContext =React.createContext()
const FetchPostAgain = React.createContext();

export function useAllPost() { return useContext( GetAllPostContext ) }
export function useCategories() {return useContext( GetCategoriesContext )}
export function useFetchPostAgain() {return useContext(FetchPostAgain)}

export const PostProvider = ({children}) => {

    const [allPost,setAllPost] = useState({
        data:{},
        status:"pending"
    });

    const [categories,setCategories] = useState({
        data:{},
        status:"pending"
    })
    const fetchPostData = async () => {
        try{
            console.log("yoyo, ",axios.defaults.baseURL)
            const [postAxios,catAxios] = await axios.all([
                axios.post(`/getFilteredInfo`),
                axios.get(`/getSortingData`), 
              ])
            setCategories({
                data:catAxios.data,
                status:"success"
            })
            setAllPost({
                data:postAxios.data,
                status:"success"
            })
        }
        catch(e){
            console.log(e);
            setAllPost({
                data:{},
                status:"failed"
            })
            setCategories({
                data:{},
                status:"failed"
            })
        }
    }
    useEffect(()=>{
        fetchPostData()
    },[])
    
    return (
        <GetCategoriesContext.Provider value = {categories}>
            <GetAllPostContext.Provider value = {allPost}>
                <FetchPostAgain.Provider value = {fetchPostData}>
                    {children}
                </FetchPostAgain.Provider>
            </GetAllPostContext.Provider>
        </GetCategoriesContext.Provider>
    )
}

