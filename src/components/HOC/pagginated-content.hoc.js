import React,{useEffect,useState} from 'react'
import axios from "axios"
const paginatedContent = (WrappedComponent) => (props) =>{
    
    const [data, setData] = useState({
        post:[],
        pageno:1,
        totalpage:1, 
        totalPost:0,
        status:"pending",
    })
    const handlePageChange = (e,i) =>{
      fetchPage(i.activePage)
    }
    const fetchPage = async (pageNo=1,firstTime=false) =>{
          try{
            if(!firstTime)
                setData({
                    post:[],
                    pageno:pageNo,
                    totalpage:data.totalpage, 
                    totalPost:data.totalPost,
                    status:"pending"
                })

            const res = await axios.post("/getFilteredInfo", {page:pageNo,sort:'date'})
              
              setData({
                 post:res.data.post,
                 pageno:res.data.currentPage,
                 totalpage:res.data.totalPage, 
                 totalPost:res.data.totalPost,
                 status:"success"
              })
            }
            catch(error){
                console.log(error)
                setData({
                    status:"failed",
                    post:[],
                    pageno:1,
                    totalpage:1, 
                    totalPost:0,
                })
            }
        }
      
    useEffect(()=>{ 
        fetchPage(1,true)
    },[])  
    return (
        <WrappedComponent {...props} handlePageChange={handlePageChange} data={data} reload={() => fetchPage(data.currentPage)}/>
    )
}

export default paginatedContent
