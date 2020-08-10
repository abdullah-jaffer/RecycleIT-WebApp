import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import AdminNavigation from "./AdminNavigation";
import AdminUpperBar from "./AdminUpperBar";
import 'date-fns';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import '../styles/HandledAlerts.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import { Redirect } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));


  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#009688',
      color: theme.palette.common.white,
      fontSize: 14
    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        fontSize: 14
      },
    },
  }))(TableRow);

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


function TablePaginationActions(props) {
    const classes = useStyles1();
    
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
         
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
         
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
      
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

export default function SuspensionReqs() {

  const classes = useStyles2();

  const [showResult, setShowResult] = React.useState(false);
  const [elements, setElements] = React.useState(null);
  const [showComponent, setShowComponent] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - 2;

  useEffect(() => {
    if(localStorage.getItem('admin') === null){
      setShowComponent(false);
      
      }else{
          fetch("https://recycleitbackend.herokuapp.com/app/suspend_reqs", {
          headers : {
              'Content-Type' : 'application/json'
          },
          method : "GET",
          'credentials': 'include'
      }).then(response => response.json())
      .then(response => {
          
          console.log(response)
         
          setElements(response);
         
          setShowResult(true);   
   
    });
    }
    }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const removeFromList1 = (event, email) => {
    fetch("https://recycleitbackend.herokuapp.com/app/cancel_suspend/?email="+email, {
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
 
    let tempList = new Array();
    let i = 0;
    elements.forEach( function (arrayItem){
      if(arrayItem.email !== email){
        tempList[i] = arrayItem;
        i++;
      }
    });
    setElements(tempList);

    

  setShowResult(true);
    
  }else{
    alert("Problem occured");
  }

});
}

    const removeFromList = (event, email, account) => {
        fetch("https://recycleitbackend.herokuapp.com/app/suspend_org/?email="+email+"&state=S&account="+account, {
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
     
        let tempList = new Array();
        let i = 0;
        elements.forEach( function (arrayItem){
          if(arrayItem.email !== email){
            tempList[i] = arrayItem;
            i++;
          }
        });
        setElements(tempList);
  
        
  
      setShowResult(true);
        
      }else{
        alert("Problem occured");
      }
   
    });
    }
 
let account_type = {
  'O' : 'Organizational',
  'S' : 'Recycler'
}
if(showComponent === true){  
  return (
    <div>
     <AdminNavigation/>
     <div  className="appbar" ><AdminUpperBar pagename="Deactivation Requests" ></AdminUpperBar></div>
     {showResult ? (
          <div className="screen5" >
             <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="right">Account Type</StyledTableCell>
            <StyledTableCell align="right">Deactivation Reason</StyledTableCell>
            <StyledTableCell >Cancel</StyledTableCell>
            <StyledTableCell >Deactivate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? elements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : elements
          ).map(row => (
            <StyledTableRow key={row.email}>
              <TableCell component="th" scope="row" style={{fontSize:'14px'}}>
                {row.email}
              </TableCell>
              <TableCell align="right" style={{fontSize:'14px'}}>{account_type[row.account]}</TableCell>
              <TableCell align="right" style={{fontSize:'14px'}}>{row.request_message}</TableCell>
              <TableCell>
            
           <IndeterminateCheckBoxIcon color="primary" style={{ fontSize: 40 }}  onClick={(e) => removeFromList1(e,row.email)}/>  
              </TableCell>
              <TableCell>
               
           <AddCircleIcon color="secondary" style={{ fontSize: 40 }} onClick={(e) => removeFromList(e,row.email, row.account)}/>   
            </TableCell>
            </StyledTableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={elements.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
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