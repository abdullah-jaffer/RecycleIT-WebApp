import React,{ useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import Background from '../images/2766672.jpg';
import SweetAlert from 'react-bootstrap-sweetalert';

var sectionStyle = {
  width: "100%",
  padding:"100px",
  height: "100%",
  backgroundImage: "url(" + Background + ")"
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    fontSize: "20px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1D63DC'
  },
}));

export default function Login() {
  const classes = useStyles();


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  
  

  useEffect(() => {
    if(localStorage.getItem('myData') !== null){
      setRedirect(true);
    }
    }, []);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };



  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    
    
    if(email ==="" ||  password ===""){
      alert("All fields are necessary");
    }else{
        /*alert("submited succesfully");
        localStorage.setItem('myData', "success");
        setRedirect(true);*/
        enterData();
    }
  };
  function nullReplacer(value){
   if (value === ""){
      return null;
   }else{
     return value;
   }
  }
  const enterData = () => {
    fetch("https://recycleitbackend.herokuapp.com/app/login_org/?email="+email+"&password="+password, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
     
  }).then(response => response.json())
  .then(response => {
      let res = {"result": "no"};
      console.log(response)
      if(response ==="{'result': 'no'}"){
        alert("the password or email is wrong")
      }
      else{
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
          info: nullReplacer(data.info),
          operating_locations: nullReplacer(data.operating_locations),
          item_list: nullReplacer(data.item_list),
          state: data.state
        };
      localStorage.setItem('myData',JSON.stringify(user));
      setRedirect(true);
    }
  });
      
      
  }

  if(redirect === true){
    return <Redirect to="/trashalerts"
  exact={true}/>;
   }
   else{
  return (
    <section style={ sectionStyle }>
    <Container component="main" maxWidth="xs" style = {{marginTop:"80px"}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{fontSize: "20px"}}>
          Log In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputProps={{
                  style: {fontSize: 15} 
                }}
                id="email"
                fontSize="20px"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
              
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputProps={{
                  style: {fontSize: 15} 
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </Grid>
           
          </Grid>
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            
          </Grid>
        </form>
      </div>
      <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
    </Container>
    
    </section>
  );}
}
