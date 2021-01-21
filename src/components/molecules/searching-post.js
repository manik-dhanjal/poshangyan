import React from 'react'
import styled from 'styled-components'

const Div = styled.div`

.skeleton {
  width: 280px;
  margin-bottom:50px;
  .image, .btn ,.line{
    background-image: linear-gradient(90deg,#ffeaea 0px,#ffd9c6 30px,#ffeaea 60px);
    background-size: calc(320px + 100px);
    animation: refresh 2s infinite ease-out;
  }
  
  .image {
    height: 180px;

  }
  .btn-grp{
    display:flex;
    justify-content:space-between;
  }
  .line{
    height: 16px;
    width: 60%;
    margin:15px auto;
  }
  .btn {
    height: 28px;
    margin-top:8px;
    width: calc( 50% - 15px );
  } 
}

@keyframes refresh {
  0% {
    background-position: calc(-100px);
  }
    
  40%, 100% {
    background-position: 320px; 
  }
}
  



`
const PreSearchPost = ({dummy=1}) => {
 return(
     <Div className='arrange-me'>
      {
      [...Array(dummy)].map((x,i)=>(
        <div className="skeleton" key={'dummy'+i}>
          {console.log(i)}
          <div className="image"></div>
          <div className="line"></div>
        </div>
      ))
      }
        
     </Div>
 )
}

export default PreSearchPost