import React, { Component } from 'react'
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import EditMain from './adminedit/editMain'
import DataFeeder from './feed'
import ThemeOfMonth from './adminedit/theme-of-month'
export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: 'Data Feeder' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
    let key = localStorage.getItem('passkey');
    // if(!key) this.props.history.push('/admin');
  }

  render() {
    const { activeItem } = this.state

    let activeView = null;

    switch(activeItem){
        case 'Data Feeder':
            activeView = <DataFeeder />
            break;
        case 'Update':
            activeView = <EditMain />
            break;
        case 'Theme of the month':
          activeView = <ThemeOfMonth/>
            break;
    }


    return (
      <Container style={{marginTop:50}}>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='Data Feeder'
              active={activeItem === 'Data Feeder'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Notify'
              active={activeItem === 'Notify'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Update'
              active={activeItem === 'Update'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Theme of the month'
              active={activeItem === 'Theme of the month'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Subscribed Users'
              active={activeItem === 'Subscribed Users'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Manage Admins'
              active={activeItem === 'Manage Admins'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12} >
          <Segment>
            {activeView}
          </Segment>
        </Grid.Column>
      </Grid>
      </Container>
    )
  }
}