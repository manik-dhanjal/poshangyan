import React, { Component } from "react";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import { Icon, Label } from 'semantic-ui-react'
import Cross from './asseat/cross.svg'
import Tick from './asseat/tick.svg'
import AlertPopup from './AlertPopup'


import './Chips.css'

export class Chips extends Component {
    state = {
        editing: false,
        value:'',
        tempValue:'',
        
    }

    componentDidMount(){
        this.setState({
            value:this.props.val,
            tempValue:this.props.val
        })
    }

    handleCrossClick = () =>{
        this.setState({
            tempValue:this.state.value,
            editing:false
        })
    }

    handleTickClick = async () => {
        let message;
        if(this.state.value!==this.state.tempValue) message = await this.props.edit(this.props.type,this.state.value,this.state.tempValue)
        else {message = 'Successfully Updated2!'; this.setState({editing:false});}
        console.log({message})
    }
    handleChange = (e) => {
        this.setState({
            tempValue:e.target.value
        })
    }

    

    render() {

        const { val, type } = this.props;

        let  sumMessage = <p className="sub__message">Are you really want to delete <em className="val_container">{val}</em> from <em className="val_container">{type}</em> ? </p>
        let message = <p className="_message"> Deleting it means you are going to remove it's existance from the database.
                        If any post contains only deleted value then it will be replaced by "Other". Like if you are deleting ANC from theme
                        and if any post contains only ANC as theme, then new theme of that post will be  "Other". Same in case of languages,target audiances etc. </p>
        return (
            <Grid xs={12} item sm={6} lg={6}   >
                    {!this.state.editing ? <div className="single__chip"  > <p className="val__para">{val} </p>
                    <div className="action__container">
                        
                        <AlertPopup message={message} submessage={sumMessage} delete={this.props.delete} type={type} val={val} />
                        <Icon name='edit' style={{ marginLeft: 5, cursor: 'pointer' }} onClick={(event) => {
                            event.stopPropagation();
                            // this.props.edit(type, val)
                            this.setState({editing:true})
                        }} />
                    </div> </div> : <div className="single__chip"  >
                        <input type="text" className="new__val__inp" onChange={(e)=>this.handleChange(e)} value={this.state.tempValue} />
                        <img src={Cross} className='__cross_btn' onClick={this.handleCrossClick} />
                        <img src={Tick} className='__tick_btn' onClick={this.handleTickClick} />
                        </div>}


            </Grid>
        )
    }
}

export default Chips;
