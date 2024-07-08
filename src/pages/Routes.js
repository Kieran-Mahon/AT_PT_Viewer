import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import 'leaflet/dist/leaflet.css';
import Map from '../components/Map/MapMaker/Map';
import Markers from '../components/Map/MapMaker/Markers';
import RouteDropdown from '../components/Dropdowns/RouteDropdown';

export default function Routes({routes, routeIDs}) {
  const [selectedRoute, setSelectedRoute] = useState([]);

  //Function called within the map function to inject the markers
  const getMarkers = () => {
    const filter = selectedRoute;
    return <Markers routes={routes} refreshTime={20000} routeFilter={filter}/>;
  };

  //Dropdown select handle
  const dropdownSelectHandle = (eventKey) => {
    setSelectedRoute([eventKey]);
  };

  return (
    <>
      <Container>
        <div>
          <RouteDropdown dropdownSelectHandle={dropdownSelectHandle} routes={routes} routeIDs={routeIDs}/>
        </div>
        <Map passedFunction={getMarkers}/>
      </Container>
    </>
  );
}
