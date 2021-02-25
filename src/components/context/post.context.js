import axios from 'axios';
import React ,{useState,useContext,useEffect} from 'react'

const GetAllPostContext =  React.createContext()
const GetCategoriesContext =React.createContext()

export function useAllPost() { return useContext( GetAllPostContext ) }
export function useCategories() {return useContext( GetCategoriesContext )}

export const PostProvider = ({children}) => {

    const [allPost,setAllPost] = useState({
        data:{},
        status:"pending"
    });

    const [categories,setCategories] = useState({
        data:{},
        status:"pending"
    })

    useEffect(()=>{
        (async ()=>{
            try{
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
        })()
    },[])
    
    return (
        <GetCategoriesContext.Provider value = {categories}>
            <GetAllPostContext.Provider value = {allPost}>
                {children}
            </GetAllPostContext.Provider>
        </GetCategoriesContext.Provider>
    )
}

