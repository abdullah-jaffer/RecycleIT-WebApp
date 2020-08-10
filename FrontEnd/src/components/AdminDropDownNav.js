import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import '../styles/navigation.css';
import profile from './profile.png';
import { NavLink } from 'react-router-dom'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
class AdminDropDownNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
          admin: ((localStorage.getItem('admin') === null) ? {id: null,
            user_name: null,
            password: null,
            email: null} : JSON.parse(localStorage.getItem('admin')))
        };
  
      }

      render() {
        
        return (
         
          <div id="mySidenav" class="sidenav1">
             <Grid container className="profiler">
              <Grid item xs={12}>
              <img src="https://res.cloudinary.com/abdullahajaffer96/image/upload/profile_qepfsr.jpg" className="round" alt="logo" height="50px" width="50px"/>
              </Grid>
              <Grid item xs={12} style={{color:"white", fontSize:18}}>
              {this.state.admin.user_name}
              </Grid>
              <Grid item xs={12}>
              
              </Grid>
              <Grid item xs={12} style={{padding:"10px"}}>
              
              </Grid>
             </Grid>
            
              <NavLink to="/admin" style={{ fontSize: 18 }}><DashboardIcon  style={{ fontSize: 40 }} className="icon" /> Dashboard  </NavLink>
              <NavLink to="/finduser" style={{ fontSize: 18 }}><SupervisedUserCircleIcon  style={{ fontSize: 40 }}  className="icon"/>Find User</NavLink>
              <NavLink to="/adminlogout" style={{ fontSize: 18 }}><ExitToAppIcon  style={{ fontSize: 40 }}  className="icon"/>Sign Out</NavLink>
      
              
          </div>
        );
      }
    }
export default AdminDropDownNav;