import React from 'react';
import { Redirect } from 'react-router-dom';

const LoggingOut = (props) => {
    localStorage.removeItem('myData');
  return (
    <div >
       <Redirect to="/login" exact={true}/>
    </div>
  );
};

export default LoggingOut;