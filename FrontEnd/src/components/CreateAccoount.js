import React, { useState } from 'react';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import background from '../images/undraw_bookmarks_r6up.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';


function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}
function union(a, b) {
  return [...a, ...not(b, a)];
}
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+background+')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SignInSide() {
  const classes = useStyles();
  
  const [orgname, setOrgname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(0);
  const [generatedCode, setGeneratedCode] = useState(0);
  const [password, setPassword] = useState('');
 
  const [value, setValue] = useState();
  const[emaild,setEmaild]=useState('');
  const[orgnamed,setOrgNameD]=useState('');
  const[phoned,setPhoneD]=useState('');
  
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const pakistanCities=['Lahore','Quetta',' Khuzdar ','Chaman','Lasbela','Zhob','Gwadar','Turbat','Sibi','Nasirabad',
    'Jaffarabad','Peshawar','Mardan','Mingora','Kohat','Bannu','Swabi','Dera Ismail Khan','Charsadda','Abbottabad','Nowshera','Lahore','Faisalabad','Rawalpindi','Gujranwala','Bahawalpur','Sialkot'
    ,'Sheikhupura','Gujrat','Multan','Sargodha','Jhang','Sahiwal','Nawabshah','Dadu','Khairpur','Shikarpur','Sukkur','Larkana','Hyderabad','Jacobabad','Karachi','Mirpur Khas','Kotli','Muzaffarabad','Rawalakot','New Mirpur City','Bagh','Pallandri','Athmuqam','Hattian Bala','Bhimber','Haveli','Islamabad','Pakistan','Gilgit','Skardu','Chilas','Khaplu','Juglot','Gahkuch','Aliabad','Bunji'];

    const c2=['北京市','重庆市','上海市','天津市','香港特别行政区','澳门特别行政区','安庆市', '蚌埠市','亳州市','巢湖市',
    '池州市','滁州市','阜阳市','合肥市','淮北市','淮南市','黄山市','界首市','六安市','马鞍山市','明光市','宁国市','宿州市','天长市','桐城市','铜陵市','芜湖市','宣城市','长乐市','福安市','福鼎市','福清市','福州市','建瓯市','晋江市','龙海市','龙岩市','南安市','南平市','宁德市','莆田市','泉州市','三明市'
    ];
    const Iran=['Abadan',    'Abadeh',    'Abyek',    'Abhar',    'Abyaneh',    'Ahar',    'Ahvaz',    'Alavicheh',    'Aligoodarz',    'Alvand',    'Amlash',    'Amol',    'Andimeshk',    'Andisheh',    'Arak',    'Ardabil',    'Ardakan',    'Asalem',    'Asalouyeh',    'Ashkezar',    'Ashlagh',    'Ashtiyan',    'Astaneh Arak',
    'Astaneh-e Ashrafiyyeh',    'Astara',    'Babol',    'Babolsar',    'Baharestan',    'Balov',    'Bardaskan',    'Bam',    'Bampur',    'Bandar Abbas',    'Bandar Anzali',    'Bandar Charak',    'Bandar Imam',    'Bandar Lengeh',    'Bandar Torkman',    'Baneh',    'Bastak',    'Behbahan',    'Behshahr',    'Bijar',    'Birjand',    'Bistam',    'Bojnourd',    'Bonab',    'Borazjan',    'Borujerd',    'Bukan',    'Bushehr',    'Damghan',    'Darab',    'Dargaz',    'Daryan',    'Darreh Shahr',    'Deylam',    'Deyr',    'Dezful',    'Dezghan',    'Dibaj',    'Doroud',    'Eghlid',    'Esfarayen',    'Eslamabad',    'Eslamabad-e Gharb',    'Eslamshahr',    'Evaz',    'Farahan',    'Fasa',    'Ferdows',    'Feshak',    'Feshk',   'Firouzabad',  'Fouman','Fasham, Tehran','Gachsaran','Garmeh-Jajarm','Gavrik','Ghale Ganj','Gerash','Genaveh','Ghaemshahr','Golbahar','Golpayegan','Gonabad','Gonbad-e Kavous','Gorgan','Hamadan','Hashtgerd','Hashtpar','Hashtrud','Heris','Hidaj','Haji Abad','Ij','Ilam','Iranshahr','Isfahan','Islamshahr','Izadkhast','Izeh', 'Jajarm',
    ];

    const Turky=['Istanbul','Ankara',    'İzmir',    'Bursa',    'Adana',    'Gaziantep',    'Konya',    'Tarsus',    'Antalya',    'Trabzon',    'Diyarbakır',    'Samsun',    'Kayseri',    'Eskişehir',    'Kocaeli',    'Malatya',    'Şanlıurfa',    'Erzurum',    'Kahramanmaraş',    'Denizli',    'Van',    'Hatay',    'Batman',    'İskenderun',    'Sakarya',    'Rize',    'Elazığ',    'Sivas',    'Balıkesir',    'Manisa',    'Adıyaman',    'Kırıkkale',    'Aydın',    'Kütahya',    'Çorum',
    'Isparta',    'Zonguldak',    'Ordu',    'Uşak',    'Nusaybin',    'Tokat',    'Erzincan',    'Karabük',    'Edirne',   'Tekirdağ',    'Karaman',    'Giresun',    'Bafra',    'Bolu',    'Kırşehir',    'Samandağ',    'Polatlı',    'Ereğli',    'Niğde',    'Lüleburgaz',    'Yozgat',    'Ağrı',    'Çanakkale',    'Amasya',    'Muş',    'Kilis',    'Bingöl',    'Hakkari',    'Kars',    'Söke',    'Nevşehir',    'Eskitatvan',    'Çankırı',    'Mardin',    'Kastamonu',    'Burdur',    'Bitlis',    'Kırklareli',    'Muğla',    'Bilecik',    'Sinop',    'Gümüşhane',    'Tunceli',    'Silopi',    'Silvan',    'Sille',    'Yeşilce',    'Çubuk',    'Çakırhüyük',    'Bozyazı',    'Derebucak',    'Zile',    'Küçükkuyu',    'Korgun',    'Korgan',    'Gökçeli',    'Görükle',    'Enez',    'Gümüşakar',    'Gümüşçay',    'Yalakdere',    'Yalangöz',    'Aktepe',    'Kandıra',    'Kangal',    'Yeşilyurt',    'Araban',    'Araç',    'Arhavi',    'Argıthanı',    'Arguvan',    'Çolaklı',    'Çaldıran',    'Bala',    'Yeşilyurt',    'Yeşilyazı',   'Yeşilyurt',    'Yeşilyurt',    'Milas',    'Sarıkamış',    'Sarıkavak',    'Sarıgöl',    'Seydim',    'Eskipazar',    'Gülnar',    'Midyat',    'Süleymanlı',    'Kilimli',    'Güneysınır',    'Sarayköy',    'Saraykent',    'Saraydüzü',
    'Demirci',    'Doğanyol',    'Doğantepe',    'Damal',    'Ortakent',    'Ortaköy',    'Kazanlı',    'Mezitli',    'Karahallı',    'Reşadiye',    'Pursaklar',    'Beykoz',   'Peçenek',    'Taşkent',    'Kemah',    'Yayla',    'Akpınar',    'Amasra',    'Şavşat',    'Bayramiç',    'Eleşkirt',    'Şamlı',    'Gölcük',    'Ferizli',    'Ilıca',
    ];
    const pakistan=['Mumbai','Delhi','Bengaluru','Ahmedabad','Chennai','Kolkata','Pune','Jaipur','Surat','Lucknow','Kanpur','Nagpur','Patna','Indore','Indore','Thane','Bhopal','Visakhapatnam','Vadodara','Firozabad','Ludhiana','Rajkot','Agra','Siliguri','Nashik','Faridabad','Patiala','Meerut','Kalyan-Dombivali','Vasai-Virar','Varanasi','Srinagar','Dhanbad','Jodhpur','Amritsar','Rajpur','Allahabad','Coimbatore','Jabalpur','Gwalior','Vijayawada','Madurai','Guwahati','Chandigarh','Hubli-Dharwad','Amroha'];
 
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

 
    const handleChange2 = event => {
      setCountry(event.target.value);
    };
 
    const handleChange3 = event => {
      setCity(event.target.value);
    };
 
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    
  } = useForm(login, validate);


  function login() {
    console.log('No errors, submit callback called!');
  }

   const handleIt = event=>{
     setEmail(event.target.value);
     handleChange(event);
  }

  const handleCode = event=>{
    setCode(event.target.value);
 }
  
  function NumberList() {
    let Cities=[];
    if(country==='Pakistan'){
      Cities=pakistanCities;
      }else if(country==='India'){
        Cities=pakistan;
      }else if(country==='China'){
        Cities=c2;
      }else if(country==='Iran'){
        Cities=Iran;
      }else if(country==='Turky'){
        Cities=Turky;
      }
    
    const listItems = Cities.map((number) =>
  <MenuItem value={number} >{number}</MenuItem>
    );
    return (
      <Select labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
     value={city}
      onChange={handleChange3}
      labelWidth={labelWidth}>{listItems}</Select>
    );
    
          
  }
  
  function sendCode(){
    let code1 = Math.floor(Math.random() * 1000);
    setGeneratedCode(code1);
    fetch("https://recycleitbackend.herokuapp.com/app/send_code/?email="+email+"&code="+code1, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
     
  }).then(response => response.json())
  .then(response => {
     alert("we've sent you a code");
    });
  }

  function orgVerification(){


    fetch("https://recycleitbackend.herokuapp.com/app/verify_org_username/?org_name="+orgname, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
     
  }).then(response => response.json())
  .then(response => {
     // let res = {"result": "no"};
      console.log(response)
      if(response ==="{'result': 'ok'}"){
        setOrgNameD("Duplicate or empty field not allowed")
      }
      if(response ==="{'result': 'no'}"){
        setOrgNameD("")
      }
    });
    
  }

function emailVerification(){


  fetch("https://recycleitbackend.herokuapp.com/app/verify_org_email/?email="+email, {
    headers : {
        'Content-Type' : 'application/json'
    },
    method : "GET",
   
}).then(response => response.json())
.then(response => {
   // let res = {"result": "no"};
    console.log(response)
    if(response ==="{'result': 'ok'}"){
      setEmaild("Duplicate or empty field not allowed")
    }
    if(response ==="{'result': 'no'}"){
      setEmaild("")
    
    }
  });
  
}
function codeVerification(){
  sendCode();
}
function phoneVerification(){
  fetch("https://recycleitbackend.herokuapp.com/app/verify_org_phone/?phone="+value, {
    headers : {
        'Content-Type' : 'application/json'
    },
    method : "GET",
   
}).then(response => response.json())
.then(response => {
   // let res = {"result": "no"};
    console.log(response)
    if(response ==="{'result': 'ok'}"){
      setPhoneD("Duplicate or empty field not allowed")
    }
    if(response ==="{'result': 'no'}"){
      setPhoneD("")
    }
  });

}


function abc() {
  if(parseInt(generatedCode) !== parseInt(code)){
    alert("wrong code, check email re enter email");
  }else{
    fetch("https://recycleitbackend.herokuapp.com/app/add_org/?orgname="+orgname+"&email="+email+"&password="+password+"&phone="+value+"&address="+address+"&country="+country+"&city="+city+"&info=&oploc=&item_list=", {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
      'credentials': 'include'
  }).then(response => response.json())
  .then(response => {
  
      console.log(response.result)
      alert("sign up succesful, go to profile tab");
      
      let user = {
        id: null,
        org_name: orgname,
        password: password,
        email: email,
        phone: value,
        address: address,
        country: country,
        city: city,
        info: null,
        operating_locations: null,
        item_list: null,
        state: 'A'
      };
  
      console.log(user)
      localStorage.setItem('myData',JSON.stringify(user));
      setRedirect(true);
  });
  }
  
}
if(redirect === true){
  return <Redirect to="/trashalerts"
exact={true}/>;
 }

  return (
    <Paper>

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7}  >
        <img style={{position:'fixed', width:'700px'}} src={background} alt='Not Found'/>
        </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{zIndex:"99"}}>  
        <div className={classes.paper}>
          
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <form className={classes.form} >
            
            <TextField
          
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organizationname"
              label="Organization Name"
              name="organizationname"
              autoComplete="Organization"
              onChange={event => setOrgname(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            <p className="help is-danger" style={{color:'red'}}>{orgnamed}</p>
            
            
                        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              onChange={event => setAddress(event.target.value)}
              id="address"
              onClick={orgVerification}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
              
            />
            
            {address}
            
            <PhoneInput
              variant="outlined"
              margin="normal"
              required
              fullWidth
             
              id="number"
              
              name="number"
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
             
              
              
              autoFocus
            />
            <p className="help is-danger" style={{color:'red'}}>{phoned}</p>










             

            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          country
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={country}
          onChange={handleChange2}
          labelWidth={labelWidth}
        >
          <MenuItem value={country}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Pakistan'}>Pakistan</MenuItem>
          <MenuItem value={'India'}>India</MenuItem>
          <MenuItem value={'China'}>China</MenuItem>
          <MenuItem value={'Iran'}>Iran</MenuItem>
          <MenuItem value={'Turky'}>Turky</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          City
        </InputLabel>
      
        
         <NumberList/>
               
      </FormControl>



















            
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              onClick={phoneVerification}
             // value={email}
            onChange={handleIt}
              
              autoComplete="off"
               className={`input ${errors.email && 'is-danger'}`}  name="email"  value={values.email || ''}
               
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon/>
                  </InputAdornment>
                ),
              }}
              
              autoFocus
            />
            {errors.email && (
                    <p className="help is-danger" style={{color:'red'}}>{errors.email}</p>
                  )}
               <p className="help is-danger" style={{color:'red'}}>{emaild}</p> 
                   
                
               <TextField
               // this is the field for the code
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id=""
              label="Code"
              onClick={codeVerification}
             // value={email}
            onChange={handleCode}
              
              autoComplete="off"
              
               
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon/>
                  </InputAdornment>
                ),
              }}
              
              autoFocus
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type='password'
              id="passwrd"
              label="Password"
              onClick={emailVerification}
              onChange={event => setPassword(event.target.value)}
              
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon/>
                  </InputAdornment>
                ),
              }}
              autoFocus
            /> 
            {password}
            
         
          
            <Button
             // type="submit"

              fullWidth
              id='btn'
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={emaild || phoned || orgnamed || errors.email}
              onClick={abc}

              
            >
              Sign Up
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account?Sign In"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
    
    </Paper>
  );
}