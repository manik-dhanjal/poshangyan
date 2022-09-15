import React,{useRef} from 'react'
import Styles from './progress-bar.styles'

const ProgressBarModal = ({errorObj,isUploading,setIsUploading,setErrorObj}) => {

const closeModal = () =>{
    setIsUploading({
        status:false,
        percentage:0,
        fileName:''
    })
    setErrorObj({
        message:'',
        files:[]
    })
}
    return (
        <Styles percentage={isUploading.percentage} objMsg={errorObj.message}>
                <div className="overlay"></div>
                    

                <div className="progress-container">
                    {
                        errorObj.message?
                        <div className="close" onClick={closeModal}> &#10005;</div>
                        :null
                    }
                    <span className='file-name'>{isUploading.fileName}</span>
                    {
                        errorObj.message?
                        <span className='error'>{errorObj.message}</span>
                        :null
                    }

                    <div className="progress">
                        <div className="progress-bar"></div>
                    </div>
                </div>
        </Styles>
    )
}

export default ProgressBarModal
