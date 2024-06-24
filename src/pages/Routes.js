import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

import Container from 'react-bootstrap/Container';
import RouteDropdown from '../components/Dropdowns/RouteDropdown';

import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'

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

  return (
    <>
      <Container>
        <br/>
        <RouteDropdown dropdownSelectHandle={dropdownSelectHandle} routes={routes} />
        {selectedRoute}
      </Container>
    </>
  )
}
  