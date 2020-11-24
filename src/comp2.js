import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./App.css";

export class Comp2 extends Component {
  
  render() {
    
    return (
             <Grid xs={12}  item sm={4}  lg={4}>
                     <Paper className="paper">mdDown</Paper>    
             </Grid>
    );
  }
}

export default Comp2;
