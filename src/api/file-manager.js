import axios from "axios"


export const createDownloadLink = async (cartItemKeys,lastDownloaded,setLastDownloaded) => {

    try{
            setLastDownloaded({...lastDownloaded,status:'pending'});
            const response = await axios.post('/create-zip',{list:cartItemKeys});
            setLastDownloaded({id:response.data,items:cartItemKeys,status:'success'});
            initiatDownload( response.data );
            return response
    }
    catch(e){
        setLastDownloaded({...lastDownloaded,status:'failed'})
        console.log(e,'is error')
    }
    return 1;
  }
 export  const initiatDownload = async (fileName) => {
     
    const downloadUrl =  (process.env.REACT_APP_API_URL||'https://poshangyan-api.niti.gov.in/')+'download-zip/'+fileName;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download',fileName);
    link.click();
  }

  export const  handleDownload = (Key,_id) => new Promise(async(resolve,reject) => {
    try{
      let url = await axios.post("/download-file",{"_id":_id,"key":Key});
      let filename = Key
      const link = document.createElement('a');
      link.href = url.data;
      link.setAttribute('download', filename);
      link.click()
      resolve(url.data)
    }
    catch(error){
      console.log(error)
      reject(error.message)
    }
  }) 
