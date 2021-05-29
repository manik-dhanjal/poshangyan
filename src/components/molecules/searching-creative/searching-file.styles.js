import styled from "styled-components"
export default styled.div`
display:flex;
.left-section{
    width:50%;
    padding-right:20px;
    .image {
        height:400px;
    }
}
.right-section{
    width:50%;
    padding-left:20px;
    .title-dummy{
        width:100%;
        .image{
            height:50px;
        }
    }
    .table-dummy{
        max-width:360px;
        width:100%;
        .image{
            height:200px;
        }
    } 
}
@media screen and (max-width:1024px){
    flex-direction:column;
    .left-section{
        width:100%;
        padding-right:0px;
        padding-bottom:0px;
        .image {
            height:200px;
        }
    }
    .right-section{
        width:100%;
        padding-left:0px;
        .title-dummy{
            margin-bottom:30px;
        }
        .table-dummy{
            max-width:100%;
            height:170px;
        }
    }
}
.skeleton {
    margin-bottom:50px;
    width:100%;
    .image, .btn ,.line{
      background-image: linear-gradient(90deg,#ffeaea 0px,#ffd9c6 30px,#ffeaea 60px);
      background-size: calc(1000px + 100px);
      animation: refresh 2s infinite ease-out;
    }
  }
  
  @keyframes refresh {
    0% {
      background-position: calc(-100px);
    }
      
    40%, 100% {
      background-position: 1000px; 
    }
  }
    
  
`