import React, { Component } from "react";
import '../styles/navigation.css';
import profile from './profile.png';
import { NavLink } from 'react-router-dom'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

class AdminNavigation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        admin:  ((localStorage.getItem('admin') === null) ? {id: null,
          user_name: null,
          password: null,
          email: null} : JSON.parse(localStorage.getItem('admin')))
      };

    }
  
    render() {
      
      return (
       
        <div id="mySidenav" class="sidenav">
           <Grid container>
            <Grid item xs={12} sm={12}>
            <div className="profiler"><img src="https://res.cloudinary.com/abdullahajaffer96/image/upload/profile_qepfsr.jpg" className="round" alt="logo" height="50px" width="50px"/></div>
            </Grid>
            <Grid item xs={12} sm={12} style={{color:"white"}}>
            <div className="profiler">{this.state.admin.user_name}</div>
            </Grid>
            <Grid item xs={12} sm={4}>
            
            </Grid>
            <Grid item xs={12} style={{padding:"10px"}}>
           
            </Grid>
           </Grid>
          
           <NavLink to="/admin" style={{ fontSize: 14 }}><DashboardIcon  style={{ fontSize: 30 }} className="icon" /> Dashboard  </NavLink>
           <NavLink to="/finduser" style={{ fontSize: 14 }}><SupervisedUserCircleIcon  style={{ fontSize: 30 }}  className="icon"/>Find User</NavLink> 
           <NavLink to="/adminlogout" style={{ fontSize: 14 }}><ExitToAppIcon  style={{ fontSize: 30 }}  className="icon"/>Sign Out</NavLink>  
        </div>
      );
    }
  }
  
  export default AdminNavigation;