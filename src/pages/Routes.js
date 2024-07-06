import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

import Container from 'react-bootstrap/Container';
import RouteDropdown from '../components/Dropdowns/RouteDropdown';

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import BusIcon from '../components/Map/MarkerIcons/BusIcon';
import TrainIcon from '../components/Map/MarkerIcons/TrainIcon';
import FerryIcon from '../components/Map/MarkerIcons/FerryIcon';

import { Icon } from 'leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
import RefreshingComponent from './test';

export default function Routes() {
  //List of routes state. Default value is the error message
  const [routes, setRoutes] = useState([{"id": 1, "attributes": { "route_short_name": "No Routes Found!"}}]);
  //Currently selected route state
  const [selectedRoute, setSelectedRoute] = useState('');

  //Populate the routes list
  useEffect(() => {
    fetch('https://api-proxy.auckland-cer.cloud.edu.au/AT/gtfs/v3/routes', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '7ddfd9ea87aa41dc9fe4efb9a5318dd5',
      }
    })
    .then(response => response.json())
    .then(response => {
      //Only override the list of routes if the json is valid
      if (response.data[0].id !== undefined) {
        setRoutes(response.data);
      }
    })
    .catch(error => console.log(error))
  }, []);
  
  //Dropdown select handle
  const dropdownSelectHandle = (eventKey) => {
    let test = routes.filter(route => route.id === eventKey);
    setSelectedRoute(JSON.stringify(test));
    //setSelectedRoute(eventKey);
    console.log(eventKey);
  };

  console.log("REFRESHED!")
  console.log(routes)
  return (
    <>
      <Container>
        <br/>
        <RouteDropdown dropdownSelectHandle={dropdownSelectHandle} routes={routes} />
        <p>{selectedRoute}</p>
        <br/>
        
      <Map />
      </Container>
    </>
  )
}

function Map() {
  const mapOptions = {
    center: [-36.8747, 174.7739],
    zoom: 12,
  };

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch('https://api-proxy.auckland-cer.cloud.edu.au/AT/realtime/legacy/vehiclelocations', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '763b2ff00d474b29bc64acd6811517bb',
      }
    })
    .then(response => response.json())
    .then(response => {
      setMarkers(response.response.entity);
      console.log(markers)
    })
    .catch(error => console.log(error))
  }, []);

  

  //<Marker position={[mark.vehicle.position.latitude, mark.vehicle.position.longitude]}/>
  let outmark = markers.map(mark =>
    //<Circle center={[mark.vehicle.position.latitude, mark.vehicle.position.longitude]} radius={20}/>
    <Marker position={[mark.vehicle.position.latitude, mark.vehicle.position.longitude]} icon={FerryIcon("yellow")}/>
  );


  return (
    <MapContainer {...mapOptions} style={{ height: '700px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {outmark}
      
    </MapContainer>
  );
};

const GetLiveVehicleMarkers = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 10000 milliseconds = 10 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Current Time:</h1>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

