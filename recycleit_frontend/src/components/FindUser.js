import React, { useState, useEffect } from "react";
import AdminNavigation from "./AdminNavigation";
import AdminUpperBar from "./AdminUpperBar";
import { makeStyles } from '@material-ui/core/styles';
import '../styles/PerformenceReport.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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


export default function FindUser(props){
  const classes = useStyles();

  const [showResult, setShowResult] = React.useState(true);
  const [accountType, setAccountType] = React.useState("O");
  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState({
    id: "",
    org_name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    info: "",
    operating_locations: "",
    item_list: "",
    state: "A"
  });

  const [showComponent, setShowComponent] = React.useState(true);

  useEffect(() => {
    if(localStorage.getItem('admin') === null){
        setShowComponent(true);
    }
    }, []);

    const handleAccountType = type => {
        setShowResult(false);
        setAccountType(type);
        setShowResult(true);
      };

      const handleEmailChange = event => {
        setEmail(event.target.value);
        
      };

      const changeStatus = () => {
          let reverse_state = {
            'S': 'A',
            'A':'S'
          }
        fetch("https://recycleitbackend.herokuapp.com/app/suspend_org/?email="+user.email+"&state="+reverse_state[user.state]+"&account="+accountType, {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : "GET",
            'credentials': 'include'
        }).then(response => response.json())
        .then(response => {
            
          if(response.result === 'ok'){
            alert("suspended");
            setShowResult(false);
    
          setShowResult(true);
            
          }else{
            alert("Problem occured");
          }
       
        });   
      }

      function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

      const search = () => {
        if(accountType === 'O'){
        fetch("https://recycleitbackend.herokuapp.com/app/get_org/?email="+email, {
          headers : {
              'Content-Type' : 'application/json'
          },
          method : "GET",
         
      }).then(response => response.json())
      .then(response => {
          if(isEmpty(response)){
            alert("No such email")
          }
          else{
            let data = response[0];
          let user1 = {
            id: data.id,
            org_name: data.org_name,
            password: data.password,
            email: data.email,
            phone: data.phone,
            address: data.address,
            country: data.country,
            city: data.city,
            info: data.info,
            operating_locations: data.operating_locations,
            item_list: data.item_list,
            state: data.state
          };
          setUser(user1);
          
        }
      });}else{
        fetch("https://recycleitbackend.herokuapp.com/app/get_user/?email="+email, {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : "GET",
           
        }).then(response => response.json())
        .then(response => {
            if(isEmpty(response)){
              alert("No such email")
            }
            else{
              let data = response[0];
            let user1 = {
              id: data.id,
              org_name: data.username,
              password: data.password,
              email: data.email,
              phone: data.phone,
              address: data.address,
              country: data.country,
              city: data.city,
              state: data.state
            };
            setUser(user1);
          }
        });

      }
          
          
      }
  
 if(showComponent === true){ 
    let account_type = {
        'O': 'Organization',
        'R': 'Recycler'
    };
    let account_status = {
        'A': 'Active',
        'S': 'Suspended'
    };

    let account_button = {
        'A': 'Deactivate',
        'S': 'Activate'
    };

    let button_color = {
        'A': 'secondary',
        'S': 'primary'
    }

  return (
    <div>
     <AdminNavigation/>
     <div  className="appbar"><AdminUpperBar pagename="Find User" ></AdminUpperBar></div>
     {showResult ? (
          <div className="screen1">
             <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} md={3}>
                  <div style={{display:"inline-block", backgroundColor:'white', height:"5px", marginBottom:"5px"}}>
                  <TextField 
                    id="outlined-basic" 
                    label="Email" 

                    inputProps={{
                      style: {fontSize: 15, height:"5px"} 
                    }} 
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    />
                    </div>
                </Grid>
                
                <Grid item xs={12} md={4}>
                <span><label style={{marginRight:"5px"}}>Account</label></span>
            <select name="trash" className="dropdown2"  onChange={(e) => handleAccountType(e.target.value)}>
             <option value="O">Organization</option>
             <option value="R">Recycler</option>
           </select>
                </Grid>
                <Grid item xs={12} md={4}> <Button variant="contained" onClick={changeStatus} color={button_color[user.state]} style={{marginTop:"10px"}}>{account_button[user.state]} Account</Button></Grid>
                <Grid item xs={12}>
                <Button variant="contained" onClick={search} color="primary" style={{marginTop:"10px"}}>Search</Button>
                  </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Personal Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Name</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.org_name}</span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Country</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.country}</span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>City</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.city}</span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Address</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.address}</span></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
              <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Contact Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Email</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.email}</span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Phone Number</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{user.phone}</span></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
              <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Account Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Account Type</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{account_type[accountType]}</span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Status</span><span style={{fontSize:"16px", marginLeft:'10px'}}>{account_status[user.state]}</span></Grid>
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
    return (<Redirect to="/adminlogin"
    exact={true}/>);
  }
}
