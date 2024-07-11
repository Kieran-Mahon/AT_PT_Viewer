import React from 'react';
import Container from 'react-bootstrap/Container';

import 'leaflet/dist/leaflet.css';
import Map from '../components/Map/MapMaker/Map';
import Markers from '../components/Map/MapMaker/Markers';

export default function Global({ routes }) {
  const injectBusMarkers = () => {
    const filter = []; //Empty filter
    return <Markers routes={routes} refreshTime={20000} routeFilter={filter} />;
  };

  return (
    <>
      <Container>
        <p></p>
        <Map passedFunction={injectBusMarkers} />
      </Container>
    </>
  );
}
