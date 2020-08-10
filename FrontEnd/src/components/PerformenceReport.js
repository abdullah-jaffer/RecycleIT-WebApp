import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import UpperBar from "./UpperBar";
import { makeStyles } from '@material-ui/core/styles';
import '../styles/PerformenceReport.css';
import Grid from '@material-ui/core/Grid';
import NavigationIcon from '@material-ui/icons/Navigation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SweetAlert from 'react-bootstrap-sweetalert';
import SimpleModal from './SimpleModal';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import { Redirect } from 'react-router-dom';

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


export default function PerformenceReport(props){
  const classes = useStyles();

  const [showResult, setShowResult] = React.useState(false);
  const [trashAlerts, setTrashAlerts] = React.useState(null);
  const [elements, setElements] = React.useState(null);
  const [org, setOrg] = React.useState(JSON.parse(localStorage.getItem('myData')));
  const [showComponent, setShowComponent] = React.useState(true);
  const [handleDays, setHandleDays] = React.useState(null);
  const [avgHandleDays, setAvgHandleDays] = React.useState(null);
  const [days, setDays] = React.useState(null);

  useEffect(() => {
    if(localStorage.getItem('myData') !== null){
      fetch("https://recycleitbackend.herokuapp.com/app/get_org_alerts/?email="+org.email, {
          headers : {
              'Content-Type' : 'application/json'
          },
          method : "GET",
          'credentials': 'include'
      }).then(response => response.json())
      .then(response => {
        setShowResult(false); 
          console.log(response)
          let tempList = new Array();
          let i = 0;
          response.forEach( function (arrayItem){
            if(arrayItem.alert.book_status === 'B'){
              tempList[i] = arrayItem;
              i++;
            }
          });
          getHandleDates();
          setElements(tempList);
          setTrashAlerts(tempList);
          setShowResult(true);  
          
          
   
    });}else{
         setShowComponent(false);
    }
    }, []);

    function getAlerts(){
      let tempList = new Array();
      let i = 0;
      trashAlerts.forEach( function (arrayItem){
          tempList[i] = arrayItem.alert;
          i++; 
      });

      return tempList;
    }
    function getHandleDates(){
      
      fetch("https://recycleitbackend.herokuapp.com/app/get_org_performence/?email="+org.email, {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : "GET",
        'credentials': 'include'
    }).then(response => response.json())
    .then(response => {
        console.log(response);  
        
        let tempList = new Array();
        let i = 0;
        let sum = 0;
        let days1 = new Array();
        response.forEach( function (arrayItem){
          tempList[i] = arrayItem;
          let dateArray1 = arrayItem.date.split('-');
          let dateArray2 = arrayItem.handled_date.split('-');
          const date1 = new Date(dateArray1[1]+'/'+dateArray1[2]+'/'+dateArray1[0]);
          const date2 = new Date(dateArray2[1]+'/'+dateArray2[2]+'/'+dateArray2[0]);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          sum += diffDays;
          days1[i] = diffDays;
          i++; 
            
      });
      setDays(days1);
      setHandleDays(tempList);
      console.log(handleDays);
      setAvgHandleDays(sum/response.length);
    });
     
    }
 
    function countHandle(){
      let count = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.status==='H'){
          count++;
        }
      });

      return count;
    }

    
    const handleTrashType = type => {
      setShowResult(false);
      if(type === "none"){
        setTrashAlerts(elements);
      }else{
        let tempList = new Array();
        let i = 0;
        trashAlerts.forEach( function (arrayItem){
          if(arrayItem.alert.item_list.split(',').includes(type)){
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
     <div  className="appbar"><UpperBar pagename="Dashboard" ></UpperBar></div>
     {showResult ? (
          <div className="screen">
             <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
              <select name="trash" className="dropdown1" onChange={(e) => handleTrashType(e.target.value)}>
                <option value="none">None</option>
                <option value="tin">Tin</option>
                <option value="can">Can</option>
                <option value="bottle">Plastic Bottle</option>
                <option value="cap">Cap</option>
              </select>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid container item xs={12} sm={6} md={3} style={{marginBottom:"30px"}}><Card1 type={true} value={elements.length}/></Grid>
                <Grid container item xs={12} sm={6} md={3} style={{marginBottom:"30px"}}><Card2 type={true} value={countHandle()}/></Grid>
                <Grid container item xs={12} sm={6} md={3} style={{marginBottom:"30px"}}><Card3 type={true} value={Math.abs(trashAlerts.length-countHandle())}/></Grid>
                <Grid container item xs={12} sm={6} md={3} style={{marginBottom:"30px"}}><Card4 value={avgHandleDays*10}/></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><LineChart alerts={getAlerts()} value={1} type={true}/></Grid>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><PieChart alerts={getAlerts()} value={1} type={true}/></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><BarChart alerts={getAlerts()} value={1} type={true}/></Grid>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><RadarChart values={days} value={1} type={true}/></Grid>
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
