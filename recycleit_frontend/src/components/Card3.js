import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const Card3 = (props) => {
  return (
    <div >
      
       
        <Grid container spacing={3} style={{ backgroundColor: '#c62828', 
        borderColor: '#c62828', color:"white" , width:"300px", marginLeft:"5px"}}>
        <Grid item xs={3}>
          <Paper variant="outlined" elevation={80} style={{textAlign:"center",fontSize:60,marginTop:"-40px", marginLeft:"3px", 
          width:"60px"}}>
            <IndeterminateCheckBoxIcon style={{fontSize:45}}/></Paper>
        </Grid>
        <Grid item xs={8} style={{fontSize:18, marginLeft:"8px"}}>
        {props.type? (<div>Unhandled <br/> Trash</div>):(<div>UnCleared <br/>Alerts</div>) }
        </Grid>
      
        <Grid item xs={12} style={{fontSize:40, marginLeft:"10%"}}>
          {props.value}
        </Grid>
        
        </Grid>
   
     
     
    </div>
  );
};

export default Card3;