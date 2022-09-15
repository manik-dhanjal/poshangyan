import React, { useEffect,useRef } from 'react'
import Styles from "./uploaded-media-card.styles"
import genericImg from "../../../assets/Images/generic.png"

const MediaCard = ({data,removeFile,uploaded=false}) => {

    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        return   validTypes.reduce((result,item) =>{ return item.includes(file.type)||result?true:false },false)
    }
    data.image = validateFile(data)
    const imageRef = useRef(null)
    useEffect(()=>{
        if(data.image&&!uploaded){
            const reader = new FileReader();
            reader.readAsDataURL(data);

            reader.onload = function(e) {
                imageRef.current.src = e.target.result;
            }
        }
        else if(data.image||data.mimetype=='image'){
            imageRef.current.src = data.location
        }
    },[data])
    return (
        <Styles genericImg = {genericImg}>
            <div className="file-card">
                <div className="img-container">
                    {
                         data.image||data.mimetype=='image'?
                         <img ref={imageRef}/>
                        :<div className='file-type-logo'> 
                            <div className="file-type-img"><img src={genericImg}/></div>
                            <div className="file-type">{fileType(uploaded?data.key:data.name)}</div>
                        </div>
                    }
                </div>
                    <span className="file-name">{uploaded?data.key:data.name}</span>
                    <span className="file-size">({uploaded?'uploaded':fileSize(data.size)})</span> 
                    <span className='card-close-btn' onClick={() => removeFile(data)}>&#10005;</span>
            </div>
        </Styles>
    )
}

export default MediaCard
