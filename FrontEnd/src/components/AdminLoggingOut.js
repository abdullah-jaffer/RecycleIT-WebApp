import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminLoggingOut = (props) => {
    localStorage.removeItem('admin');
  return (
    <div >
       <Redirect to="/adminlogin" exact={true}/>
    </div>
  );
};

export default AdminLoggingOut;