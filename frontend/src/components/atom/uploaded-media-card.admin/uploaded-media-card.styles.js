import styled from "styled-components"

export default styled.div`
padding:0px 15px;
padding-bottom:20px;
width:180px;
.file-card{
    display:flex;
    flex-direction:column;
    justify-content:center;
    position:relative;
    .card-close-btn{
        background:#ff000090;
        width:23px;
        height:23px;
        border-radius:50px;
        position:absolute;
        top:-8px;
        color:white;
        display:flex;
        justify-content:Center;
        align-items:center;
        right:-8px;
        cursor:pointer;
    }
}
.file-name{
    font-weight:600;
}
.file-size{
    font-size:12px;
}
.file-type-logo{
    position:relative;
    margin:20px;
}
.img-container{
    background:#f1f1f1f1;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:10px;
    width:150px;
    height:150px;
    &>img{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center;
    }
}
.file-type {
    display: inline-block!important;
    position: absolute;
    font-size: 14px;
    font-weight: 700;
    top: 50%;
    padding: 0 5px;
    border-radius: 2px;
    box-shadow: 1px 1px 2px #abc;
    color: #fff;
    background: #0080c8;
    text-transform: uppercase;
}

.file-type-img {
    width: 80px;
    height: 80px;
    img{
        width:100%;
        height:100%;
        object-fit:contain;
    }
}

`