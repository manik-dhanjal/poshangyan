import styled from "styled-components"

export default styled.div`
.scroll-container{
    overflow-y:auto;
    overflow-x:hidden;
    height:60vh;
    display:flex;
    align-items:center;
    justify-content:center;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    h1{
        text-align:center;
    }
    &::-webkit-scrollbar {
        display: none;
      }
}
.card-container{
    display:flex;
    flex-wrap:wrap;
    padding:20px 0;
    width:100%;
    min-height:100%;
}
`