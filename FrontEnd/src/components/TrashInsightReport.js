import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import AdminNavigation from "./AdminNavigation";
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
import SideBar from './SideBar';
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



export default function TrashInsightReport(props) {
  const classes = useStyles();

  const [showResult, setShowResult] = React.useState(false);
  const [trashAlerts, setTrashAlerts] = React.useState(null);
  const [elements, setElements] = React.useState(null);
  const [org, setOrg] = React.useState(JSON.parse(localStorage.getItem('myData')));
  const [showComponent, setShowComponent] = React.useState(true);

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
            
              tempList[i] = arrayItem;
              i++;
            
          });
          setElements(tempList);
          setTrashAlerts(tempList);
          setShowResult(true);    
   
    });}else{
         setShowComponent(false);
    }
    }, []);

   
    function countBooked(){
      let count = 0;
      trashAlerts.forEach( function (arrayItem){
        if(arrayItem.book_status==='B'){
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
     <div  className="appbar"><UpperBar pagename="Trash Insights" ></UpperBar></div>
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
                <Grid container item xs={12} sm={4} style={{marginBottom:"30px"}}><Card1 type={false} value={elements.length}/></Grid>
                <Grid container item xs={12} sm={4} style={{marginBottom:"30px"}}><Card2 type={false} value={countBooked()}/></Grid>
                <Grid container item xs={12} sm={4} style={{marginBottom:"30px"}}><Card3 type={false} value={Math.abs(trashAlerts.length-countBooked())}/></Grid>
                
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><LineChart alerts={trashAlerts} value={2} type={false}/></Grid>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><PieChart alerts={trashAlerts} value={2} type={false}/></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><BarChart alerts={trashAlerts} value={2} type={false}/></Grid>
                <Grid xs={12} sm={6} style={{marginTop:"20px"}}><SideBar alerts={trashAlerts} value={2} type={false}/></Grid>
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
