import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Card1 = (props) => {
  return (
    <div >
      
       
        <Grid container spacing={3} style={{ backgroundColor: '#0d47a1', borderColor: '#0d47a1', 
        color:"white", width:"300px", marginLeft:"5px" }}>
        <Grid item xs={3}>
          <Paper variant="outlined" elevation={80} style={{textAlign:"center",
          fontSize:60,marginTop:"-40px", marginLeft:"3px",
          width:"60px"}}>
            <AddCircleOutlineIcon style={{fontSize:45}}/></Paper>
        </Grid>
        <Grid item xs={8} style={{fontSize:18, marginLeft:"8px"}}>
        {props.type? (<div>Disposal <br/>Count</div>):(<div>All <br/>Alerts</div>) }
        </Grid>
      
        <Grid item xs={12} style={{fontSize:40, marginLeft:"10%"}}>
          {props.value}
        </Grid>
        
        </Grid>
   
     
     
    </div>
  );
};

export default Card1;