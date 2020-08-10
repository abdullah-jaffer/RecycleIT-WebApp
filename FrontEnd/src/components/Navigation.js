import React, { Component } from "react";
import '../styles/navigation.css';
import mainlogo from './recyclelogo.png';
import profile from './profile.png';
import { NavLink } from 'react-router-dom'; 
import PieChartIcon from '@material-ui/icons/PieChart';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import UpperBar from "./UpperBar";
import Grid from '@material-ui/core/Grid';
import AssessmentIcon from '@material-ui/icons/Assessment';
class Navigation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        org: ((localStorage.getItem('myData') === null) ? {id: null,
          org_name: null,
          info: null,
          item_list: null} : JSON.parse(localStorage.getItem('myData'))),
        completion: 40
      };
   
    }
  
    nullReplacer = (value) => {
      if (value === ""){
         return null;
      }else{
        return value;
      }
     }    
    componentDidMount(){
      let value = this.state.completion;
    if(this.state.org.info !== null){this.setState({ completion: value + 35});
    value = value + 35;
    
}
    if(this.state.org.item_list !== null){this.setState({ completion: value + 25});}
    
    if(this.state.org.id === null || this.state.org.id === ""){
      fetch("https://recycleitbackend.herokuapp.com/app/get_org/?email="+this.state.org.email, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
     
  }).then(response => response.json())
  .then(response => {
    let data = response[0];
        
    let user = {
      id: data.id,
      org_name: data.org_name,
      password: data.password,
      email: data.email,
      phone: data.phone,
      address: data.address,
      country: data.country,
      city: data.city,
      info: this.nullReplacer(data.info),
      operating_locations: this.nullReplacer(data.operating_locations),
      item_list: this.nullReplacer(data.item_list),
      state: data.state
    };
    this.setState({org: user});
  localStorage.setItem('myData',JSON.stringify(user));
  });
    }
  }

    
    render() {
      
      let inputStyle = {
        width: this.state.completion + "%",
      };
      return (
       
        <div id="mySidenav" class="sidenav">
           <Grid container className='profiler'>
            <Grid item xs={12} sm={12}>
           <div className="profiler"><img src={"https://res.cloudinary.com/abdullahajaffer96/image/upload/org"+this.state.org.id} className="round" alt="logo" height="50px" width="50px"/></div>
            </Grid>
            <Grid item xs={12} sm={12} style={{color:"white"}}>
            <div className="profiler"> {this.state.org.org_name}</div>
            </Grid>
            <Grid item xs={12} sm={4}>
            
            </Grid>
            <Grid item xs={12} style={{padding:"10px"}}>
            <div class="progress bar">
              <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
              aria-valuenow={this.state.completion.toString()} aria-valuemin="0" aria-valuemax="100" style={inputStyle}>
                {this.state.completion}% Complete
              </div>
            </div>
            </Grid>
           </Grid>
          
            <NavLink to="/trashalerts" style={{ fontSize: 14 }}><DeleteIcon  style={{ fontSize: 30 }} className="icon" /> Trash Alerts  </NavLink>
            <NavLink to= "/handledalerts" style={{ fontSize: 14 }}><IndeterminateCheckBoxIcon  style={{ fontSize: 30 }}  className="icon"/>Handled Alerts</NavLink>
            <NavLink to="/unhandledalerts" style={{ fontSize: 14 }}><AddBoxIcon  style={{ fontSize: 30 }}  className="icon"/>Unhandled Alerts</NavLink>
            <NavLink to="/trashinsightreport" style={{ fontSize: 14 }}><PieChartIcon  style={{ fontSize: 30 }}  className="icon"/>Trash Insight Report</NavLink>
            <NavLink to="/performencereport" style={{ fontSize: 14 }}><AssessmentIcon  style={{ fontSize: 30 }}  className="icon"/>Performence Report</NavLink>
            <NavLink to="/profile"className="dist" style={{ fontSize: 14 }}><PersonIcon style={{ fontSize: 30 }}  className="icon"/>Manage Profile</NavLink>
            <NavLink to="/logout" style={{ fontSize: 14 }}><ExitToAppIcon  style={{ fontSize: 30 }}  className="icon"/>Sign Out</NavLink>
    
            
        </div>
      );
    }
  }
  
  export default Navigation;
  