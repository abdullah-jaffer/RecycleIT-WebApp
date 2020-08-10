import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import '../styles/PerformenceReport.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import Navigation from "./Navigation";
import UpperBar from "./UpperBar";
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';





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
const useStyles1= makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));


export default function FindUser(props){
  const classes = useStyles();

  const [showResult, setShowResult] = React.useState(true);
  const [accountType, setAccountType] = React.useState("O");
  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState(JSON.parse(localStorage.getItem('myData')));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('myData')));
  const [open, setOpen] = React.useState(false);
  const [email1,setEmail1]=React.useState(org.email);
  const [showComponent, setShowComponent] = React.useState(true);
  const[reason,setReason]=React.useState();
  const [file, setFile] = React.useState(null);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState(['Cigarette(Cigarette)','Unlabeled litter(Unlabeled litter)','Bottle(Plastic drink bottle)','Plastic bag & wrapper(Plastic Film)','Other plastic(Other plastic)','Can(Drink can)','Bottle cap(Plastic bottle cap)','Plastic bag & wrapper(Other plastic wrapper)','Straw(Plastic straw)','Cup(Disposable plastic cup)','Aluminium foil(Aluminium foil)','Carton(Other carton)','Bottle(Glass bottle)','Cup(Paper cup)','Styrofoam piece(Styrofoam piece)','Pop tab(Pop tab)','Paper(Normal paper)','Lid(Plastic lid)','Can(Food Can)','Carton(Drink carton)','Plastic container(Disposable food container)','Bottle cap(Metal bottle cap)','Plastic bag & wrapper(Single-use carrier bag)','Plastic bag & wrapper(Crisp packet)','Carton(Meal carton)','Plastic utensils(Plastic utensils)','Bottle(Other plastic bottle)','Carton(Corrugated carton)','Paper bag(Paper bag)','Plastic bag & wrapper(Garbage bag)','Rope & strings(Rope & strings)','Plastic container(Foam food container)','Can(Aerosol)','Paper(Magazine paper)','Paper(Tissues)','Carton(Egg carton)','Cup(Foam cup)','Plastic container(Spread tub)','Shoe(Shoe)','Food waste(Food waste)','Lid(Metal lid)','Glass jar(Glass jar)','Plastic container(Tupperware)','Scrap metal(Scrap metal)','Squeezable tube(Squeezable tube)','Blister pack(Aluminium blister pack)','Carton(Pizza box)','Carton(Toilet tube)','Cup(Glass cup)','Paper(Wrapping paper)','Plastic bag & wrapper(Six pack rings)','Plastic glooves(Plastic glooves)','Straw(Paper straw)','Cup(Other plastic cup)','Plastic container(Other plastic container)']);
  



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

      function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
            
                return false;
        }
        return true;
    }

    function intersection(a, b) {
      return a.filter(value => b.indexOf(value) !== -1);
    }
    function union(a, b) {
      return [...a, ...not(b, a)];
    }

    function not(a, b) {
      return a.filter(value => b.indexOf(value) === -1);
    }
    function TransferList() {
  
      const classes = useStyles1();
      const [checked, setChecked] = React.useState([]);
      
     
      const leftChecked = intersection(checked, left);
      const rightChecked = intersection(checked, right);
    
      const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    
      const numberOfChecked = items => intersection(checked, items).length;
    
      const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
          setChecked(not(checked, items));
        } else {
          setChecked(union(checked, items));
        }
      };
    
      
      const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
      };
    
      const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
      };
    
      const customList = (title, items) => (
        <Card>
          <Paper >
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
                inputProps={{ 'aria-label': 'all items selected' }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
          />
          <Divider />
          <List className={classes.list} dense component="div" role="list">
            {items.map(value => {
              const labelId = `transfer-list-all-item-${value}-label`;
    
              return (
                <Paper >
                <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItem>
                </Paper>
              );
            })}
            <ListItem />
            
          </List>
          </Paper>
        </Card>
        
      );
    
      return (
        <Paper elevation ={1} >
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList('Choices', left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList('Chosen', right)}</Grid>
        </Grid>
        
        </Paper>
      );
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleSaveFile(){
      let formData = new FormData();
      formData.append('image', file);
      formData.append('caption', "profile");
      formData.append('email', org.email);

      let url = 'https://recycleitbackend.herokuapp.com/app/add_org_photo/';
      axios.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  
  };
    
  
    function deactivate() {
      fetch("https://recycleitbackend.herokuapp.com/app/add_sus_rep/?email="+org.email+"&reqmsg="+reason+"&password="+org.password+"&account=O", {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : "GET",
        'credentials': 'include'
    }).then(response => response.json())
    .then(response => {
    
        console.log(response.result)
        alert("Request Sent");
        handleClose();
        //setRedirect(true);
    });
    }




    const updateInfo =() => {
      fetch("https://recycleitbackend.herokuapp.com/app/add_org/?email1="+email1+"&orgname="+user.org_name+"&email2="+user.email+"password="+user.password+"&phone="+user.phone+"&address="+user.address+"&country="+user.country+"&city="+user.city+"&info=null&oploc=null&item_list="+left, {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : "GET",
        'credentials': 'include'
    }).then(response => response.json())
    .then(response => {
    
        console.log(response.result)
        alert("Request sent");

        let user1 = {
          id: null,
          org_name: user.org_name,
          password: user.password,
          email: user.email,
          phone: user.phone,
          address: user.address,
          country: user.country,
          city: user.city,
          info: user.info,
          operating_locations: user.operating_locations,
          item_list: user.item_list,
          state: 'A'
        };
        
        alert("Request sent");
        localStorage.setItem('myData',JSON.stringify(user1));
        //setRedirect(true);
    });
    }
    const handleFile = (event) => {
      setFile(event.target.files[0]);
  
    };
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

     <Navigation />
     <div  className="appbar"><UpperBar pagename="Manage Profile" on></UpperBar></div>
     
    
     {showResult ? (
          <div className="screen1">
             <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                
                
                
                <Grid item xs={12} md={4}> <Button variant="contained" onClick={updateInfo} color='Primary' style={{marginTop:"10px"}}> Save Changes</Button></Grid>
                <div>
      

      <Grid item xs={12} md={12}> <Button variant="contained" onClick={handleClickOpen} color='#FF0000' style={{marginTop:"20px"}}> Deactivate Acccount</Button></Grid>

      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirmation message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give us a reason why you want to leave?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            value={reason}
            onChange={event => setReason(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deactivate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
                
              </Grid>
              <Grid container item xs={12} spacing={3}>
              
                <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Personal Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Name</span><span style={{fontSize:"16px", marginLeft:'10px'}}>          <TextField  onChange={event => setUser({ org_name :event.target.value})}       value={user.org_name} /></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Country</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ country :event.target.value})}  value={user.country} disabled='true' /></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>City</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField   onChange={event => setUser({ city :event.target.value})}   value={user.city}  disabled='true'   /></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Address</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ address :event.target.value})}   value={user.address}/></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Description</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ info :event.target.value})}   value={user.info}/></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Operating Locations</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ operating_locations :event.target.value})}   value={user.operating_locations}/></span></Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
              <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Contact Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Email</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ email :event.target.value})}  value={user.email}/></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Phone Number</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField  onChange={event => setUser({ phone :event.target.value})}  value={user.phone}/></span></Grid>
              </Grid>
              <Grid container item xl={12} spacing={3}>
              
              <Grid container item xl={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Upload Profile Picture</Grid>
              <Grid container item xl={6} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", width:'100%'}}>
                <input type="file" name="file" accept="image/*" onClick={(e) => handleFile(e)}/></span></Grid>
                <Grid container item xl={6} sm={6} md={6} style={{marginBottom:"10px"}}>
                <Button variant="contained" onClick={handleSaveFile} color='#FF0000'> Save</Button>

                </Grid>

              <Grid container item xl={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Select Category</Grid>
              <Grid container item xl={12} sm={12} md={12} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", width:'100%'}}><TransferList /></span></Grid>
              
              </Grid>


              <Grid container item xs={12} spacing={3}>
              <Grid container item xs={12} sm={12} md={12} style={{marginBottom:"10px", fontSize:"26px", fontWeight:"bold", borderBottom:"1px solid black"}}>Account Info</Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Account Type</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField value={account_type[accountType]}/></span></Grid>
                <Grid container item xs={12} sm={6} md={6} style={{marginBottom:"10px"}}><span style={{fontSize:"16px", fontWeight:"bold"}}>Status</span><span style={{fontSize:"16px", marginLeft:'10px'}}><TextField value={account_status[user.state]}/></span></Grid>
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
