import React, { useEffect, useContext,Component,useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import EditMain from './adminedit/editMain'
import AddPost from './add-post.admin/add-post.components'
import ThemeOfMonth from './adminedit/theme-of-month'
import { Dimmer, Loader } from 'semantic-ui-react';

const  MenuExampleTabularOnLeft = () => {
  const [activeItem,setActiveItem] = useState('Data Feeder')
  const {userData} = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if(userData.status==="failed")
      history.push("/");
  }, [userData.status]);
  const handleItemClick = (e, { name }) => { setActiveItem(name) }


    let activeView = null;

    switch (activeItem) {
      case 'Data Feeder':
        activeView = <AddPost />
        break;
      case 'Update':
        activeView = <EditMain />
        break;
      case 'Theme of the month':
        activeView = <ThemeOfMonth />
        break;
    }


    return (
        <Container style={{ marginTop: 50 }}>
          {
            userData.status==="success"?
              <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name='Data Feeder'
                    active={activeItem === 'Data Feeder'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Update'
                    active={activeItem === 'Update'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Theme of the month'
                    active={activeItem === 'Theme of the month'}
                    onClick={handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12} >
                <Segment>
                  {activeView}
                </Segment>
              </Grid.Column>
            </Grid>
            :userData.status==="pending"?
               <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
               </Dimmer>
              :<h1>Failed</h1>
          }
          
        </Container>
    )
  }

  export default MenuExampleTabularOnLeft;