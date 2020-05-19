import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Maps from './Maps';

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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>
        Alert Details
      </Typography>
        </Grid>
        <Grid item xs={6}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px"}}>Location:</label> {props.alert.address}
      </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px"}}>Trash:</label>{props.alert.item_list}
      </Typography>
        </Grid>
        <Grid item xs={12}>
         <Typography variant="h6" gutterBottom>
         <label style={{fontWeight:"bold", fontSize:"14px"}}>Country:</label>{props.alert.country}
      </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
        <label style={{fontWeight:"bold", fontSize:"14px"}}>City:</label>{props.alert.city}
      </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
          <label style={{fontWeight:"bold", fontSize:"14px"}}>Type of Alert:</label> {props.alert.type}
      </Typography>
        </Grid>
        <Grid item xs={12}>
         <Typography variant="h6" gutterBottom>
         <label style={{fontWeight:"bold", fontSize:"14px"}}>Date of Report:</label> {props.alert.date}
      </Typography>
        </Grid>
        </Grid>
        <Grid item xs={6}><Maps /></Grid>
      </Grid>
    </div>
  );
}