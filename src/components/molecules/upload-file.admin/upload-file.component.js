import React,{useState} from 'react'
import Styles from './upload-file.styles'
import MediaUpload from "../../atom/admin.media-upload"

const UploadFile = ({setDropedFiles,dropedfiles,handleError,images}) => {

    const validateFile = (file,images) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if(!images) return true;
        return   validTypes.reduce((result,item) =>{ return item.includes(file.type||file.mimetype)||result?true:false },false)
    }
    const handleFile = (files) =>{
        const alreadyExist = [];
        const notValid = [];
        setDropedFiles(prevArray =>{
            for(var item of files){
                const check = prevArray.find(prevItem => prevItem.name+prevItem.lastModified===item.name+item.lastModified)
                const validforImage=validateFile(item,images)
                if( !check && validforImage )
                    prevArray.push(item)
                else{
                     if(!validforImage)
                        notValid.push(item.name)
                    else{
                        alreadyExist.push(item.name)
                    }
                }
            }
            return prevArray
        })
        if(alreadyExist.length)
            handleError({
                message:'Uploaded file already exist.',
                fileName:alreadyExist
            })
        if(notValid.length)
            handleError({
                message:'Uploaded file is not image.',
                fileName:notValid
            })
    }
  
    return (
        <Styles>
            <MediaUpload onChange={handleFile}/>
        </Styles>
    )
}

export default UploadFile
