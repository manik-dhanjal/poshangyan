import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const PreSearchPost = ({row=1}) => {

const grid=[];
 for(var i=0;i<row;i++){
    grid.push(
    <Grid columns='four' divided style={{padding:"30px 0"}} key={i}>
      <Grid.Row>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
 }
 return(
     <div>
         {grid.map(a => a)}
     </div>
 )
}

export default PreSearchPost