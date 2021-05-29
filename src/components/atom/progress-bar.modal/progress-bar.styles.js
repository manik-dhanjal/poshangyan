import styled from "styled-components"

export default styled.div`

    z-index: 1000;
    overflow: hidden;
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
.overlay{
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.66);
    position: absolute;
    top: 0;
    left: 0;
}

.progress-container {
    background: white;
    width: 500px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
}

.progress-container span {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-size: 20px;
}

.progress {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #efefef;
    height: 20px;
    border-radius: 5px;
}

.progress-bar {
    position: absolute;
    background-color: #4aa1f3;
    height: 20px;
    border-radius: 5px;
    text-align: center;
    color: white;
    font-weight: bold;
    width:${({percentage})=> percentage}%;
    transition:ease 0.1s;
}

.error {
    color: red;
}
`