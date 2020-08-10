import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Map from './Map';
import CopyText from './CopyText';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Details(props) {
  const classes = useStyles();
  let trashType = {
    'PER': ' Personal',
    'PUB': ' Public',

}
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>
        Alert Details
      </Typography>
        </Grid>
        
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>Location</label> {props.alert.address}
      </Typography>
        </Grid>
        <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>Trash</label>{props.alert.item_list}
      </Typography>
        </Grid>
        <Grid item xs={4}>
         <Typography variant="h6" gutterBottom>
         <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>Country</label>{props.alert.country}
      </Typography>
        </Grid>
        <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>City</label>{props.alert.city}
      </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
          <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>Type</label> {trashType[props.alert.type]}
      </Typography>
        </Grid>
        <Grid item xs={4}>
         <Typography variant="h6" gutterBottom>
         <label style={{fontWeight:"bold", fontSize:"14px", paddingRight: "10px"}}>Date</label> {props.alert.date}
      </Typography>
        </Grid>

        <Grid item xs={12}>
        <CopyText text={"https://www.google.com/maps/search/?api=1&query="+props.alert.latitude+","+props.alert.longitude} />
        </Grid>
        <Grid item xs={12}>
          <Map lat={alert.latitude}  lng={alert.longitude} />
        </Grid>
           
      </Grid>
    </div>
  );
}