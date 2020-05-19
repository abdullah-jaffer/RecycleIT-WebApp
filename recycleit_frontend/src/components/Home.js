import React, { useState } from 'react';
import ReactGlobe from 'react-globe';
import defaultMarkers from './markers';
import '../styles/home.css';
import { NavLink } from 'react-router-dom'; 
import Map from './Map.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../images/recycleitcropped.png';

function getTooltipContent(marker) {
  return `CITY: ${marker.city}    Littering: ${marker.value}%`;
}

function Home() {
  const randomMarkers = defaultMarkers.map(marker => ({
    ...marker,
    value: Math.floor(Math.random() * 100),
  }));
  const [markers, setMarkers] = useState(defaultMarkers);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails({'city':marker.city, 'value': marker.value});
  }
  function onDefocus(previousCoordinates, event) {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(null);
  }

  return (
     <div style={{ width: '100vw', height: '100vh' }}>
      <ReactGlobe
        markers={markers}
        markerOptions={{
          getTooltipContent,
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
      <div
       style={{
        
        position: 'absolute',
        fontSize: 20,
        color:'blue',
        top: 10,
        left: 10,
        padding: 18,
        borderRadius:'10%',
        fontWeight:'bold'
      }}><h1>RecycleIT</h1></div>

      <div
       style={{
        position: 'absolute',
        bottom: 20,
        right: '30%',
      }}><NavLink to="/signup" className="b"> <button className="button" style={{verticalAlign:"middle"}}><span>Sign Up </span></button> </NavLink></div>


<div
       style={{
        position: 'absolute',
        bottom: 20,
        right: '55%',
      }}><NavLink to="/login" className="b"> <button className="button" style={{verticalAlign:"middle", backgroundColor:"#43a047"}}><span>Log In </span></button> </NavLink></div>
      {details && (
        <div
          style={{
            background:'black',
            position: 'absolute',
            fontSize: 20,
            opacity: 0.6,
            color:'white',
            top: 50,
            right: 10,
            padding: 12,
          }}>
          <h3 style={{marginBottom:"10px"}}>City:{details.city}</h3>
          <h3 style={{marginBottom:"10px"}}>Littering Rate:{details.value}%</h3>
          <h3 style={{marginBottom:"10px"}}>
            position=
            {JSON.stringify(event.pointerEventPosition)})
          </h3>
        </div>
      )}
     
    </div>
  );

  
}

export default Home;
