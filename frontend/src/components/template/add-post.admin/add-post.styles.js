import styled from "styled-components"

export default styled.div`

.heading-2{
    margin-top:10px;
    margin-bottom:10px;
  }
  hr{
      margin-bottom:30px;
  }
  .upload{
    display:flex;
    justify-content:start;
    grid-gap:20px;
  }
  .custom-input{
    width:100%;
    margin-bottom:15px;
}
.upload-section{
    margin-bottom:15px;
    h3{
        margin-bottom:3px;
    }
    .upload-btn{
        margin-right:20px;
    }
    .link-input{
        width:250px;

    }
    .radio-group{
        display:flex;
        margin-bottom:30px;
        align-items:Center;
        .head{
            font-size:20px;
            font-weight:600;
            margin-right:20px;
        }
        .input-grp{
            font-size:16px;
      
            margin-right:20px;
            label{
                margin-left:5px;
                cursor:pointer;
            }
            input{
                cursor:pointer;
            }
        }
    }
}
`