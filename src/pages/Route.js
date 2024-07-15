import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import 'leaflet/dist/leaflet.css';
import RouteDropdown from '../components/Dropdowns/RouteDropdown';
import Map from '../components/Map/MapMaker/Map';
import Markers from '../components/Map/MapMaker/Markers';
import RouteMapper from '../components/Map/MapMaker/RouteMapper';

export default function Routes({ routes, routeIDs }) {
  const [routeVisual, setRouteVisual] = useState("");
  const [showMap, setShowMap] = useState(false);

  //Function called within the map function to inject the markers
  const injectRouteVisual = () => {
    return routeVisual;
  };

  //Dropdown select handle
  const dropdownSelectHandle = (eventKey) => {
    setRouteVisual(
      <>
        <Markers routes={routes} refreshTime={20000} routeFilter={[eventKey]} />
        <RouteMapper routeRef={[eventKey]} />
      </>
    );
    setShowMap(true);
  };

  return (
    <>
      <Container>
        <div style={{ padding: '10px' }}>
          <RouteDropdown dropdownSelectHandle={dropdownSelectHandle} routes={routes} routeIDs={routeIDs} />
        </div>
        {showMap && <Map passedFunction={injectRouteVisual} />}
      </Container>
    </>
  );
}
