import styled from "styled-components"

export default styled.div`
background-color: #f4d6cc;
.container{
    margin: auto;
    height: 600px;
    width: 600px;
    position: relative;
}
.err {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 23%;
    top: 24%;
  }

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 41%;
  top: 15%;
  color: #ffffff;
}

 .err2 {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 65%;
    top: 24%;
  }

.msg {
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    position:absolute;
    left: 16%;
    top: 45%;
    width: 75%;
    h1{
        font-size:2em;
    }
  }

a {
  text-decoration: none;
  color: #ff425e;
}

a:hover {
  text-decoration: underline;
}
`