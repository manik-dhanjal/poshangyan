import React from 'react'
import styled from "styled-components"
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import go from "../../assets/Images/go.png";

const Div = styled.div`
background : white;
border-radius : 100px;
display:flex;
padding:10px 20px;
.menu{
    display:flex;
    align-items:center;
    width:100%;
    .select-cont{
        border-right:1px solid grey;
        display:flex;
        justify-content:center;
        width:100%;
        &:last-of-type{
            border:none;
        }
        &>div>div{
            left: calc(-128px + 50%);
        }
    }
}
.submit-btn{
    width:50px;
}
`
const BannerMenu = ({menuData,arrow}) => {
    return (
        <Div>
            <div className="menu">
                {menuData.map( ( menu ,i) =>{
                return  (
                    <div className="select-cont">
                         <ReactMultiSelectCheckboxes placeholderButtonLabel={menu.label}  options={menu.option}  onChange={menu.func}/>
                    </div>
                )
                })}
            </div>
            <div class="submit-btn">
                <input type="image"  src={go} style={{ height: 40 }} alt="go" onClick={arrow} />
            </div>
        </Div>
    )
}

export default BannerMenu
