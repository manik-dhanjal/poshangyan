import styled from "styled-components"
export default styled.div`
    background:white;
    border-radius:15px;
    padding:20px 30px;
    display:grid;
    align-items:center;
    max-width:500px;
    grid-template-columns: 70px 1fr;
    grid-template-rows: 35px 1fr;
    margin-bottom:15px;
    .mp4-logo{
        width:60px;
    }
    .head{
        padding:0 20px;
            min-height: 1em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            grid-row: 1/2;
            grid-column: 2/3;
            margin: 0;
        }
    }
    .mp4-logo{
        grid-row: 1/3;
        grid-column: 1/2;
    }
.downloaded{
    font-size:1.2em;
    white-space:nowrap;

    .count{
        color:rgb(340,66,94);
        font-weight:600;
    }
        margin-bottom: 15px;
}
.download-btn{
    grid-row: 2/3;
    grid-column: 2/3;
    padding-left: 20px;
}
.download-btn button{
    background:rgb(340,66,94);
    color:white;
    font-size:1.3em;
    padding:10px 20px;
    &:hover{
        background:rgb(340,66,94);
        color:white;
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
    background: #ff425e;
    text-transform: uppercase;
}

.file-type-img {
    width: 70px;
    height: 70px;
    img{
        width:100%;
        height:100%;
        object-fit:contain;
    }
}
.file-type-logo{
    position:relative;
}
@media screen and (max-width:991px){
    margin:0 auto;
    margin-bottom:30px;
}
@media screen and (max-width:500px){

        margin-bottom:50px;
        grid-template-rows: 40px 90px;
        grid-template-columns: 70px 1fr;
    .head{
        grid-column: 1/3;
        grid-row: 1/2;
        margin: 0;
        padding:0;
        text-align:center;
        padding-bottom:5px;
        border-bottom: 1px solid #e6e6e6;
    }
    .download-btn{
        grid-column:2/3;
        grid-row:2/3;
        padding-left:20px;
    }
    .mp4-logo{
        grid-row: 2/3;
        grid-column: 1/2;
    }

}
`