import axios from "axios";
const allData = async () =>{
  try{
      const posts = await axios.post("/getFilteredInfo");
      return  posts.data;
  }
  catch(e){
      console.log(e)
      return []
  }
}
export default allData;