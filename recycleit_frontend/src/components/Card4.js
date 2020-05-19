import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const Card4 = (props) => {
  return (
    <div >
      
       
        <Grid container spacing={3} style={{ backgroundColor: '#4caf50', borderColor: '#4caf50', 
        color:"white", width:"300px", marginLeft:"5px" }}>
        <Grid item xs={3}>
          <Paper variant="outlined" elevation={80} style={{textAlign:"center",fontSize:60,marginTop:"-40px", marginLeft:"3px", 
          width:"60px"}}>
            <EqualizerIcon style={{fontSize:45}}/></Paper>
        </Grid>
        <Grid item xs={8} style={{fontSize:18, marginLeft:"8px"}}>
        Average <br/> Effeciency
        </Grid>
      
        <Grid item xs={12} style={{fontSize:40, marginLeft:"10%"}}>
          {props.value}
        </Grid>
        
        </Grid>
   
     
     
    </div>
  );
};

export default Card4;