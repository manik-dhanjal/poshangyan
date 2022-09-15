import styled from "styled-components"

export default styled.div`
padding-bottom:60px;

.slick-dots {
    bottom:-80px;
    overflow-x:auto;
    .dot-flex-cont{
        display:flex;
        margin-left:-5px;
        li{
            width:60px;
            height:60px;
            overflow:hidden;
            img{
                width:100%;
                height:100%;
                object-fit:cover;
                object-position:center;
            }
    }
}}
.prev-arr{
    position: absolute;
    left: 10px;
    top: 50%;
    z-index: 100;
    font-size: 28px;
    cursor: pointer;
    color: #080808;
    padding: 5px;
}
.next-arr{
    position: absolute;
    right: 10px;
    top: 50%;
    z-index: 100;
    font-size: 28px;
    cursor: pointer;
    color: #080808;
    padding: 5px;
}
`