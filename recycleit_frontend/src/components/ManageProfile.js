import React, { useState } from 'react';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import SvgIcon from '@material-ui/core/SvgIcon';
import PhoneInput from 'react-phone-input-2';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LockIcon from '@material-ui/icons/Lock';
/*import Background from './food.jpg';*/

var sectionStyle = {
  width: "100%",
  padding:"100px",
  height: "100%",
 /* backgroundImage: "url(" + Background + ")"*/
};


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
    
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    //color:'red',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

export default function ManageProfile() {

  const classes = useStyles();
  
  const [orgname, setOrgname] = useState('RecycleIt');
  const [address, setAddress] = useState('Lahore');
  const [email, setEmail] = useState('Abc@gmail.com');
  const[email2,setEmail2]=useState('Abc@gmail.com');
  const [location, setLocation] = useState('WapdaTown');
  const [number, setNumber] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [reason, setReason] = useState('');
  const [value, setValue] = useState('+92305 4088180');
  const[dname,setDName]=useState(true);
  const[daddress,setDAddress]=useState(true);
  const[dlocation,setDlocatio]=useState(true);
  const[demail,setDEmail]=useState(true);
  const[dpassword,setDPassword]=useState(true);
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const pakistan=['Mumbai','Delhi','Bengaluru','Ahmedabad','Chennai','Kolkata','Pune','Jaipur','Surat','Lucknow','Kanpur','Nagpur','Patna','Indore','Indore','Thane','Bhopal','Visakhapatnam','Vadodara','Firozabad','Ludhiana','Rajkot','Agra','Siliguri','Nashik','Faridabad','Patiala','Meerut','Kalyan-Dombivali','Vasai-Virar','Varanasi','Srinagar','Dhanbad','Jodhpur','Amritsar','Rajpur','Allahabad','Coimbatore','Jabalpur','Gwalior','Vijayawada','Madurai','Guwahati','Chandigarh','Hubli-Dharwad','Amroha'];
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [city1, setCity1] = React.useState([]);
  const[emaild,setEmaild]=useState('');
  const[orgnamed,setOrgNameD]=useState('');
  const[phoned,setPhoneD]=useState('');
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState(['Cigarette(Cigarette)','Unlabeled litter(Unlabeled litter)','Bottle(Plastic drink bottle)','Plastic bag & wrapper(Plastic Film)','Other plastic(Other plastic)','Can(Drink can)','Bottle cap(Plastic bottle cap)','Plastic bag & wrapper(Other plastic wrapper)','Straw(Plastic straw)','Cup(Disposable plastic cup)','Aluminium foil(Aluminium foil)','Carton(Other carton)','Bottle(Glass bottle)','Cup(Paper cup)','Styrofoam piece(Styrofoam piece)','Pop tab(Pop tab)','Paper(Normal paper)','Lid(Plastic lid)','Can(Food Can)','Carton(Drink carton)','Plastic container(Disposable food container)','Bottle cap(Metal bottle cap)','Plastic bag & wrapper(Single-use carrier bag)','Plastic bag & wrapper(Crisp packet)','Carton(Meal carton)','Plastic utensils(Plastic utensils)','Bottle(Other plastic bottle)','Carton(Corrugated carton)','Paper bag(Paper bag)','Plastic bag & wrapper(Garbage bag)','Rope & strings(Rope & strings)','Plastic container(Foam food container)','Can(Aerosol)','Paper(Magazine paper)','Paper(Tissues)','Carton(Egg carton)','Cup(Foam cup)','Plastic container(Spread tub)','Shoe(Shoe)','Food waste(Food waste)','Lid(Metal lid)','Glass jar(Glass jar)','Plastic container(Tupperware)','Scrap metal(Scrap metal)','Squeezable tube(Squeezable tube)','Blister pack(Aluminium blister pack)','Carton(Pizza box)','Carton(Toilet tube)','Cup(Glass cup)','Paper(Wrapping paper)','Plastic bag & wrapper(Six pack rings)','Plastic glooves(Plastic glooves)','Straw(Paper straw)','Cup(Other plastic cup)','Plastic container(Other plastic container)']);
  const [password, setPassword] = useState('Password');
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
 
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    console.log('No errors, submit callback called!');
  }
  const styles = {
    paperContainer: {
        //backgroundImage: `url(${"cat.jpg"})`
    }
};
const handleChange2 = event => {
  setCountry(event.target.value);
  
};


const handleChange3 = event => {
  setCity(event.target.value);
};
function NumberList() {
  let a=[''];
  if(country==='Pakistan'){
  a=pakistanCities;
  }else if(country==='India'){
    a=pakistan;
  }else if(country==='China'){
    a=c2;
  }else if(country==='Iran'){
    a=Iran;
  }else if(country==='Turky'){
    a=Turky;
  }
  const listItems = a.map((number) =>
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
      <Paper style={{backgroundColor:'#E6E6E6'}}>
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
            <Paper style={{backgroundColor:'#E6E6E6'}}>
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
    <Paper elevation ={1} style={{backgroundColor:'#E6E6E6'}}>
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
  function abc() {
    fetch("https://recycleitbackend.herokuapp.com/app/add_org/?email1="+email+"&orgname="+orgname+"&email2="+email2+"&password="+password+"&phone="+value+"&address="+address+"&country="+country+"&city="+value+"&info=null&oploc=null&item_list="+left, {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
      'credentials': 'include'
  }).then(response => response.json())
  .then(response => {
  
      console.log(response.result)
      alert("Request sent");
      let user = {
        first_name: orgname,
      
        eml: email,
        ph: value,
        //ss: ssn,
        //pass: password
      };
      console.log(user)
      localStorage.setItem('myData',JSON.stringify(user));
      //setRedirect(true);
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
  const handleEmail =event =>{
    setEmail2(event.target.value);
    emailVerification(event);
  }
const handleOrgName = event =>{

        setOrgname(event.target.value);
        orgVerification(event);
}
  function deactivate() {
    fetch("https://recycleitbackend.herokuapp.com/app/add_sus_rep/?email="+email+"&reqmsg="+reason+"&password=4455&account=O", {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : "GET",
      'credentials': 'include'
  }).then(response => response.json())
  .then(response => {
  
      console.log(response.result)
      alert("Request Sent");
      let user = {
        first_name: orgname,
      
        eml: email,
        ph: value,
        //ss: ssn,
        //pass: password
      };
      console.log(user)
      localStorage.setItem('myData',JSON.stringify(user));
      //setRedirect(true);
  });
  }
   
  return (
    <div  >
    
    <section style={ sectionStyle } >
    <Grid container component="main" className={classes.root} style={styles.paperContainer}>
      <CssBaseline />
      <Grid item xs={12} sm={3} md={3} > 
      
           
      <div>
      
      </div>

      </Grid>
      
      <Grid item xs={12} sm={4} md={8}>
      
        <div className={classes.paper} fullWidth>
          
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ManageProfile
          </Typography>
          <Paper elevation={5} className={classes.form} style={{backgroundColor:'#E6E6E6'}}>
          <form fullWidth>
          
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organizationname"
              value={orgname}
              label="Organization Name"
              name="organizationname"
              autoComplete="Organization"
              onChange={handleOrgName}
              disabled={dname}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" onClick={event => setDName(!{dname})}>
                    <AccountCircle  />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            {orgnamed}
           
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              value={address}
              onChange={event => setAddress(event.target.value)}
              id="address"
              onClick={orgVerification}
              disabled={daddress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" onClick={event => setDAddress(!{daddress})}>
                    <HomeIcon  />
                  </InputAdornment>
                ),
              }}
              
            />
            
           
            
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              
              onChange={handleEmail}
              value={email2}
              //autoComplete="off" className={`input ${errors.email && 'is-danger'}`}  name="email" onChange={handleChange} value={values.email || ''} required 
              
              disabled={demail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" onClick={event => setDEmail(!{demail})}>
                    <EmailIcon/>
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
           
            {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                  
<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              disabled={dpassword}
              type='password'
              id="passwrd"
              label="Password"
              name='password'
              //onClick={emailVerification}
              onChange={event => setPassword(event.target.value)}
              
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" onClick={event => setDPassword(!{dpassword})}>
                    <LockIcon/>
                  </InputAdornment>
                ),
              }}
              autoFocus
            /> 
                 
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
          <MenuItem value="Pakistan">
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
             
              color='red'
              
              autoFocus
            />
            
            <Typography component="h1" variant="h5">
            Select Trash Category
          </Typography>
        
              <TransferList />
          
           

              <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
           onClick = {abc}
              className={classes.submit}
            >
              Save Changes
            </Button>
            
          </form>
          
          </Paper>
          <Paper elevation={2} className={classes.form} style={{backgroundColor:'#E6E6E6'}}>
          <form > 
              
          <Typography component="h1" variant="h5">
            Account Deactivation
          </Typography>

          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="reason"
              label="Reason"
              name="reason"
              multiline={true}
              back
                   
               rows={3}
               
              rowsMax={Infinity}
              onChange={event => setReason(event.target.value)}
              //backgroundColor="red"
              autoFocus

            />
      
            
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
           onClick = {deactivate}
              className={classes.submit}
            >
              Send Request
            </Button>
            
          </form>
          </Paper>

        </div>
        
      </Grid>
      
      <Grid item xs={12} sm={5} md={3}>
        <div>
     
      </div>
      </Grid>
    </Grid>
    </section>
    </div>
  );
}