import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HandledAlerts from "./components/HandledAlerts";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import ManageProfile from "./components/ManageProfile";
import PerformenceReport from "./components/PerformenceReport";
import TrashAlerts from "./components/TrashAlerts";
import TrashInsightReport from "./components/TrashInsightReport";
import UnhandledAlerts from "./components/UnhandledAlerts";
import Home from "./components/Home";
import SuspensionReq from "./components/SuspensionReq";
import LoggingOut from "./components/LoggingOut";
import AdminLoggingOut from "./components/AdminLoggingOut";
import FindUser from "./components/FindUser";
import CreateAccoount from "./components/CreateAccoount";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div className="App" >
      
      
     <BrowserRouter>
        <div>
          
          <Switch>
            
            <Route path="/handledalerts" component={HandledAlerts} />
            <Route path="/unhandledalerts" component={UnhandledAlerts} />
            <Route path="/profile" component={ManageProfile} />
            <Route path="/performencereport" component={PerformenceReport} />
            <Route path="/trashalerts" component={TrashAlerts} />
            <Route path="/trashinsightreport" component={TrashInsightReport} />
            <Route path="/login" component={Login} />
            <Route path="/adminlogin" component={AdminLogin} />
            <Route path="/admin" component={SuspensionReq} />
            <Route path="/logout" component={LoggingOut} />
            <Route path="/adminlogout" component={AdminLoggingOut} />
            <Route path="/finduser" component={FindUser} />
            <Route path="/signup" component={CreateAccoount} />
          </Switch>
          <Route path="/" component={Home} exact />
        </div>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
