import React from 'react'
import Styles from "./media-library.styles"
import MediaCard from "../../atom/uploaded-media-card.admin/uploaded-media-card.component"
import axios from "axios"
const MediaLibrary = ({setFiles,files,uploadedFiles,setUploadedFiles,handleError}) => {
    const removeFile = (file) => {
        setFiles(prevFilesArr => {
            return prevFilesArr.reduce((totalArr,prevFile) =>{
                    const check = prevFile.name+prevFile.lastModified===file.name+file.lastModified
                    return !check?[...totalArr,prevFile]:totalArr;
                 },[])
        })
    }
    const removeUploadedFile = async (file) => {
        try{
            let token = localStorage.getItem("auth-token");
            const response = await axios.delete('/file/'+file.key,{headers: { "x-auth-token": token },})
            setUploadedFiles(prevFilesArr => {
                return prevFilesArr.reduce((totalArr,prevFile) =>{
                        const check = prevFile.location===file.location
                        return !check?[...totalArr,prevFile]:totalArr;
                     },[])
            })
        }
        catch(e){
            console.log(e)
            handleError({
                message:'Unable to delete file:',
                fileName:file.key
            })
        }
    }
    return (
        <Styles>
            <div className='scroll-container'>
            {
                (files.length||uploadedFiles.length)?
                   (
                        <div className='card-container'>
                            {
                                files.map((item,i)=> <MediaCard data={item} removeFile={removeFile} key={i+'media-card'}/> )
                            }
                            {
                                uploadedFiles.map((item,i)=><MediaCard data={item} uploaded = {true} removeFile={removeUploadedFile} key={i+'media-card-uploaded'}/> )
                            }
                        </div>
                    )
                    :<h1>Upload some files</h1>
                    
            }
           </div>
        </Styles>
    )
}

export default MediaLibrary
