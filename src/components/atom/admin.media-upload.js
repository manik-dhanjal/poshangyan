import React,{useRef} from 'react'
import styled from "styled-components"
import uploadIcon from "../../assets/Images/upload.png"
const Div = styled.div`
margin-top:20px;
.drop-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: 300px;
  max-height:100%;
  border: 2px dashed grey;
  height:55vh;
}

.upload-icon {
  width: 50px;
  height: 50px;
  background:${({uploadIcon}) => `url(${uploadIcon}) no-repeat center center`}; 
  background-size: 100%;
  text-align: center;
  margin: 0 auto;
  padding-top: 30px;
  margin-bottom:20px;
}

.drop-message {
  text-align: center;
  color: #333;
  font-family: Arial;
  font-size: 20px;
  cursor:pointer;
}
.file-input {
  display: none;
} 
`
const MediaUpload = ({onChange,images}) => {

  const dragOver = (e) => {
      e.preventDefault();
  }

  const dragEnter = (e) => {
      e.preventDefault();
  }

  const dragLeave = (e) => {
      e.preventDefault();
  }

  const fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length)
        onChange(files);
  }
  const fileInputClicked = () => {
    fileInputRef.current.click();
  }
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
        onChange(fileInputRef.current.files);
    }
  } 
  const fileInputRef = useRef();
    return (
        <Div uploadIcon = {uploadIcon}>
              <div className="drop-container"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={fileInputClicked}
              >
                <div className="drop-message">
                    <div className="upload-icon"></div>
                    Drag & Drop files here or click to upload
                </div>
                <input
                      ref={fileInputRef}
                      className="file-input"
                      type="file"
                      multiple
                      onChange={filesSelected}
                  />
              </div>
        </Div>
    )
}

export default MediaUpload
