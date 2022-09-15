import styled from "styled-components"
 export default styled.div`
 padding: 15px;
padding:${({state}) => state?'15px':'0 15px'};
position:absolute;
width:300px;
right:0;
top:100%;
z-index:801;
background:white;
min-height:${({state}) => state?'292px':'0'};
max-height:${({state}) => state?'292px':'0'};
overflow:hidden;
box-shadow: -2px 21px 53px -13px rgba(0,0,0,0.32);
border-radius: 0 0 5px 5px;
transition:0.4s ease;
    .card-container{
    height:175px;
    overflow-y:auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.head{
    display:flex;
    justify-content:space-between;
    h4{
        margin:0;
    }
    span{
        font-size:0.85em;
        color:rgb(340,66,94);
        cursor:pointer;
    }
}
.failed-message{
    background:#fdc6c6;
    border:1px solid red;
    text-align:Center;
    padding:5px 10px;
    border-radius:5px;
    margin:10px 0;
    color:red;
}
.card{
    display:grid;
    grid-template-columns:25% 75%;
    margin-bottom:20px;
    &:last-of-type{
        margin-bottom:0;
    }
    .img-cont{
        width:100%;
        height:50px;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
    }
    .content{
        display:flex;
        margin-left:15px;
        align-items:center;
        justify-content:space-between;
        p{
            margin:0;
        }
        .close-btn{
            margin-left:5px;
            transition:0.2s ease;
            cursor:pointer;
            &:hover{
                color:rgb(340,66,94);
            }
        }
    }
}

.ui.animated.button {
    background: rgb(340,66,94);
    color: white;
    float:right;
}
hr{
    color:rgb(340,66,94);
}
 `
