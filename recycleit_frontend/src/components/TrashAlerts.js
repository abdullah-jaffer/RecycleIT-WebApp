import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import UpperBar from "./UpperBar";
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/HandledAlerts.css';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper';
import SimpleModal from './SimpleModal';
import { Redirect } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }, margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  },
}));

export default function TrashAlerts() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-11'));
  const [address, setAddress] = React.useState(null);
  const [showResult, setShowResult] = React.useState(false);
  const [trashAlerts, setTrashAlerts] = React.useState(null);
  const [elements, setElements] = React.useState(null);
  const [org, setOrg] = React.useState(JSON.parse(localStorage.getItem('myData')));
  const [showComponent, setShowComponent] = React.useState(true);
  const [showStyle, setShowStyle] = React.useState(false);

  
  useEffect(() => {
    if(localStorage.getItem('myData') !== null){
      fetch("https://recycleitbackend.herokuapp.com/app/get_all_alerts", {
          headers : {
              'Content-Type' : 'application/json'
          },
          method : "GET",
          'credentials': 'include'
      }).then(response => response.json())
      .then(response => {
          
          console.log(response)
          let tempList = new Array();
          let i = 0;
          response.forEach( function (arrayItem){
            if(arrayItem.book_status === 'UB'){
              tempList[i] = arrayItem;
              i++;
            }
          });
          setElements(tempList);
          setTrashAlerts(tempList);
          setShowResult(true);   
   
    });}else{
          setShowComponent(false);
    }
    }, []);

    const addToList = (event, id) => {
      fetch("https://recycleitbackend.herokuapp.com/app/add_org_alert/?email="+org.email+"&alertid="+id, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
      'credentials': 'include'
  }).then(response => response.json())
  .then(response => {
      
    if(response.result === 'ok'){
      alert("booked");
      setShowResult(false);
   
      let tempList = new Array();
      let i = 0;
      elements.forEach( function (arrayItem){
        if(arrayItem.id !== id){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setElements(tempList);

      let tempList1 = new Array();
      i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.id !== id){
          tempList1[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList1);

    setShowResult(true);
      
    }else{
      alert("Problem occured");
    }
 
  });
  }

  const handleDateChange = date => {
    setSelectedDate(date); 
  };

  const onDateClick = date => {
    let date1 = selectedDate.toISOString().substring(0, 8);
    let finalvalue = parseInt(selectedDate.toISOString().substring(8, 10));
    date1 = date1 + (finalvalue +1);
    let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.date === date1){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList);
    
  };

  const handleTrashType = type => {
    setShowResult(false);
    if(type === "none"){
      setTrashAlerts(elements);
    }else{
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.item_list.split(',').includes(type)){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList);
    }

    setShowResult(true);
  };

  const handleCountry = type => {
    setShowResult(false);
   
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.country === type){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList);
    

    setShowResult(true);
  };

  const handleAlertType = type => {
    setShowResult(false);
   
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.type === type){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList);
    

    setShowResult(true);
  };

  const handleCity = type => {
    setShowResult(false);
   
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.city === type){
          tempList[i] = arrayItem;
          i++;
        }
      });
      setTrashAlerts(tempList);
    

    setShowResult(true);
  };



  const discardFilters = event => {
    setTrashAlerts(elements);
  };
  const handleAddressChange = event => {
    setAddress(event.target.value);
    setShowResult(false);
    if(address === null){
      setTrashAlerts(elements);
    }
    else if(address.replace(/  +/g, ' ') === " " || address.replace(/  +/g, ' ') === ""){
      setTrashAlerts(elements);
    }
    else{
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.address.includes(address)){
          tempList[i] = arrayItem;
          i++;
        }
      });

    setTrashAlerts(tempList);
  }
    setShowResult(true);
  };


 
if(showComponent === true){  
  return (
    <div>
     <Navigation/>
     <div  className="appbar" ><UpperBar pagename="Trash Alerts" ></UpperBar></div>
     {showResult ? (
          <div className="screen" >
             <Grid container spacing={1} >
              <Grid item xs={12} sm={3}>
              <Grid item xs={12}>
              <h3>Filters</h3>
                  </Grid>
                  <Grid item xs={12}>
                  <div style={{display:"inline-block", marginTop:'10px', paddingRight:"10px"}}><label>Location</label></div>
                  </Grid>
                <Grid item xs={12}>
                  <div style={{display:"inline-block", backgroundColor:'white', height:"5px", marginBottom:"5px"}}>
                  <TextField 
                    id="outlined-basic" 
                    label="" 
                    inputProps={{
                      style: {fontSize: 15, height:"5px"} 
                    }} 
                    variant="outlined"
                    value={address}
                    onChange={handleAddressChange}
                    />
                    </div>
                </Grid>
                <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                inputProps={{
                  style: {fontSize: 15, marginTop:"30px", width:"80px"} 
                }}
                id="date-picker-inline"
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
          </MuiPickersUtilsProvider>
          <Button onClick={onDateClick} variant="outlined" color="secondary" style={{marginLeft:"5px",height:"30px", fontSize:"10px", display: "inline-block", marginTop:"50px", marginBottom:"10px"}}>
              Set Date
            </Button>
                </Grid>
               
                  <Grid item xs={12}><label style={{}}>Alert</label> </Grid>
                <Grid item xs={12}>
                
            <select name="trash" className="dropdown" onChange={(e) => handleAlertType(e.target.value)}>
             <option value="PUB">Public</option>
             <option value="PER">Personal</option>
           </select>
                </Grid>
                <Grid item xs={12}><label style={{}}>Trash Type</label> </Grid>
                <Grid item xs={12}>
                
            <select name="trash" className="dropdown" onChange={(e) => handleTrashType(e.target.value)}>
             <option value="none">None</option>
             <option value="tin">Tin</option>
             <option value="can">Can</option>
             <option value="bottle">Plastic Bottle</option>
             <option value="cap">Cap</option>
           </select>
                </Grid>
                <Grid item xs={6} >
                <Grid item xs={12} ><label style={{}}>Country</label> </Grid>
                
                <Grid item xs={12}>
                 
            <select name="country" className="dropdown" onChange={(e) => handleCountry(e.target.value)}>
             <option value="Pakistan">Pakistan</option>
             <option value="USA">USA</option>
             <option value="Australia">Australia</option>
             <option value="Japan">Japan</option>
             </select>
                </Grid>
                </Grid>
                <Grid item xs={6} >
                <Grid item xs={12} ><label style={{}}>City</label> </Grid>
                <Grid item xs={12}>
                
            <select name="trash" className="dropdown" onChange={(e) => handleCity(e.target.value)}>
             <option value="lahore">lahore</option>
             <option value="islamabad">islamabad</option>
             <option value="karachi">karachi</option>
             </select>
                </Grid>
                </Grid>
                <Grid xs={12}> <Button onClick={discardFilters} variant="contained" color="secondary" style={{marginTop:"20px", marginBottom:"20px", width:"180px",height:"40px", fontSize:"14px"}}>
              Remove Filters
            </Button></Grid>
              </Grid>
              <Grid item xs={12} sm={9}>
               
            <Grid xs={12}>
            <h3 style={{marginBottom:"30px"}}>{trashAlerts.length} Alerts currently being reported</h3>
            </Grid>
            <Grid xs={12}>
            {trashAlerts.map(trash =>(
           
           <Paper elevation={3} className="filters1 element">
              <div className="filters1">
              <Grid container spacing={3}>
         <Grid xs={4} sm={2}><LocationOnIcon color="primary"  style={{display:"inline"}}/><p style={{display:"inline", marginLeft:"5px"}}>{trash.address}</p></Grid>
         <Grid xs={4} sm={2}><DeleteIcon style={{ color: green[500], display:"inline" }}/><p style={{display:"inline", marginLeft:"5px"}}>{trash.item_list.split(',')[0]}...</p></Grid>
         <Grid xs={4} sm={2}><CalendarTodayIcon color="secondary" style={{display:"inline"}}/><p style={{display:"inline", marginLeft:"5px"}}>{trash.date}</p></Grid>
             <Grid xs={0} sm={2}></Grid>
              <Grid xs={4} sm={2}>
            <Fab
             variant="extended"
             size="medium"
             color="primary"
             aria-label="add"
             className={classes.margin}
             value={trash.id}
             onClick={(e) => addToList(e,trash.id)}
           >
             <NavigationIcon className={classes.extendedIcon}/>
             Handle It
           </Fab>
         </Grid>
         <Grid xs={4} sm={2}>
             <SimpleModal alert ={trash}/>
         </Grid>
         </Grid>
              </div>
             
              </Paper>
              
      
         ))}
            </Grid>
              </Grid>
              
           </Grid>
           </div>
        ) : <CircularProgress style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}
   />}
     
      </div> 
  );} else {
    return (<Redirect to="/login"
    exact={true}/>);
  }
}