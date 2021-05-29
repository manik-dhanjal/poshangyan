import React,{useRef} from 'react'
import Styles from './progress-bar.styles'

const ProgressBarModal = ({percentage,fileName,errorObj}) => {



    return (
        <Styles percentage={percentage}>
                <div className="overlay"></div>
                {/* <div className="close" onClick={(() => closeUploadModal())}>X</div> */}
                <div className="progress-container">
                    {/* <span ref={uploadRef}></span> */}
                    <span className='file-name'>{fileName}</span>
                    <div className="progress">
                        <div className="progress-bar"></div>
                    </div>
                </div>
        </Styles>
    )
}

export default ProgressBarModal
