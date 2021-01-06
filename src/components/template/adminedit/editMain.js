import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react'
import './editMain.css'

export class EditMain extends Component {
  state={
    activeFilter:'Posts'
  }

  setActiveFilter = (val) => {
    this.setState({
      activeFilter:val
    })
  }
  render(){
    let dropDown = <Dropdown
    text={this.state.activeFilter}
    icon='filter'
    floating
    labeled
    button
    className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Divider />
      <Dropdown.Item icon='feed' text='Posts' onClick={()=>this.setActiveFilter("Posts")} />
      <Dropdown.Item icon='themeisle' text='Themes' onClick={()=>this.setActiveFilter("Themes")} />
      <Dropdown.Item icon='language' text='Languages' onClick={()=>this.setActiveFilter("Languages")} /> 
      <Dropdown.Item icon='chart pie' text='Others' onClick={()=>this.setActiveFilter("Others")} />
    </Dropdown.Menu>
  </Dropdown>
    return (
      <div className="edit__admin__root">
        <div className="dropdown__edit_list" >
          {dropDown}
        </div>
      
      </div>
    )
  }
}

export default EditMain;
