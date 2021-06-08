import React,{useEffect, useState,useRef} from 'react'
import Styles from './upload-popup.styles'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import UploadFile from "../upload-file.admin/upload-file.component"
import MediaLibrary from "../media-library.admin/media-library.component"
import axios from "axios"
import ProgressBarModal from '../../atom/progress-bar.modal/progress-bar.component'
import Alert from "@material-ui/lab/Alert";

const UploadPopup = ({children,images=false,uploadedFiles,setUploadedFiles}) => {
    const [open, setOpen] = useState(false)
    const [dropedFiles,setDropedFiles] = useState([])
    // const [uploadedFiles,setUploadedFiles] = useState([])
    const [errorObj,setErrorObj] = useState(null);
    const [errorInUpload,setErrorInUpload] = useState({
        message:'',
        files:[]
    })
    const [isUploading,setIsUploading] = useState({
        status:false,
        percentage:0,
        fileName:''
    })
    const progressRef =useRef(null)
    const uploadPercentageRef = useRef(null)
    const panes = [
        { menuItem: 'Upload Files', render: () => <UploadFile setDropedFiles={setDropedFiles} handleError={handleError} images={images}/>  },
        { menuItem: 'Media Library', render: () => <MediaLibrary setFiles = {setDropedFiles} files={dropedFiles} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} handleError={handleError}/> },
      ]
      const handleError = (errorObj) => {
        setErrorObj({...errorObj})
        console.log(errorObj)
        setTimeout(()=>{
            setErrorObj(null)
        },5000)
    }
    const handleUpload = async (selectedFiles) => {
   
        if(!selectedFiles.length||!selectedFiles) return [];
        setIsUploading({
            status:true,
            percentage:0,
            name:''
        })
        const uploadedFileUrl =[]
        for(var i=0;i<selectedFiles.length;i++){
            const data = new FormData();
            data.append("file",selectedFiles[i]);
            try{
                let token = localStorage.getItem("auth-token");
                const fileUrl = await axios.post('/upload-file',data,{headers: { "x-auth-token": token },
                        onUploadProgress: (progressEvent) => {
                            const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                            setIsUploading({
                                status:true,
                                percentage:uploadPercentage,
                                fileName:selectedFiles[i].name
                            })
                    }
                })
                uploadedFileUrl.push(fileUrl.data);

            }
            catch(error){
                console.log(error,'error while uploading')
                setDropedFiles(prevFiles => {
                    const errorFile = selectedFiles[i].name
                    setErrorInUpload((prevErr)=>{
                        return { message:'error while uploading file', files:[...prevErr.files,errorFile.name]}
                    })
                        return prevFiles.filter(file => file.name!==selectedFiles[i].name)
                })
               
            }
        }
        if(!errorInUpload.message){
            setDropedFiles([]);
            setUploadedFiles(prevFiles => [...prevFiles,...uploadedFileUrl])
            setIsUploading({
                status:false,
                percentage:0,
                fileName:''
            })
            setOpen(false)
        }
    }
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={children}
        >
            <Modal.Header>
                 {images?'Upload Images':'Upload Files'}

                <span className='close-btn' style={{float:'right',cursor:'pointer'}} onClick={()=>setOpen(false)}>
                     &#10005;
                </span>
            </Modal.Header>
            <Modal.Content>
                <Styles>
                    <Tab panes={panes} />
                    {isUploading.status?<ProgressBarModal errorObj = {errorInUpload} setErrorObj = {setErrorInUpload}isUploading={isUploading} setIsUploading={setIsUploading}/>:null}
                    {
                        errorObj?
                        <Alert onClose={() => setErrorObj(null)} severity="error">
                            {errorObj.message}
                        </Alert>
                        :null
                    }
                </Styles>
            </Modal.Content>
            <Modal.Actions>
            <Button
                content="Upload"
                labelPosition='right'
                icon='checkmark'
                disabled = {false}
                onClick={() =>{handleUpload(dropedFiles)}}
                positive
                />
            </Modal.Actions>
      </Modal>
    )
}

export default UploadPopup
