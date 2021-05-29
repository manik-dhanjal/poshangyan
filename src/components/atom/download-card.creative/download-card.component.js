import React,{useState} from 'react'
import { handleDownload } from '../../../api/file-manager'
import { Button, Icon } from 'semantic-ui-react'
import Styles from "./download-card.styles"
import genericImg from "../../../assets/Images/generic.png"
const DownloadCard = ({file,_id}) => {
    const [downloadStatus,setDownloadStatus] = useState('')
    const handleCardDownload = async (key,_id) => {
        setDownloadStatus('pending')
        try{
            const url = await handleDownload(key,_id);
            setDownloadStatus('success')
        }catch(e){
            console.log(e.message)
            setDownloadStatus('failed')
        }
    }
    const fileType = (file) => {
        if(file.mimetype==='others'){
            const fileName = file.key;
            return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
        }
        return file.mimetype;
    }
    return (
        <Styles>
                <div className="mp4-logo">
                        <div className='file-type-logo'> 
                            <div className="file-type-img"><img src={genericImg}/></div>
                            <div className="file-type">{fileType(file)}</div>
                        </div>
                    </div>
                        <h3 className='head'>{file.name}</h3>
                        <div className="download-btn">
                            <p className="downloaded"> <span className="count"> {file.downloadsCount}</span> Downloads   </p>
                            <Button 
                                onClick={() => handleCardDownload(file.key,_id)} 
                                animated 
                                loading = {downloadStatus==='pending'}
                                disabled = {downloadStatus==='pending'}
                            >
                                <Button.Content visible >{downloadStatus!=='failed'?'Download':'TryAgain'}</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='download' inverted />
                                </Button.Content>
                            </Button>
                         </div>
        </Styles>
    )
}

export default DownloadCard
