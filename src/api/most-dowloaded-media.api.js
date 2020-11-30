import axios from "axios";

const downloadedMediaApi = async () =>{
  try{
      const posts = await axios.post("/getFilteredInfo");
      return  posts.data.slice(0,8)
  }
  catch(e){
      console.log(e)
      return []
  }
}
export default downloadedMediaApi;