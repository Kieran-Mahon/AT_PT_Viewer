import React from 'react';

import Container from 'react-bootstrap/Container';

import 'leaflet/dist/leaflet.css';
import Map from '../components/Map/MapMaker/Map';

export default function Global({routes}) {
  return (
    <>
      <Container>
        <p></p>
        <Map routes={routes} refreshTime={20000}/>
      </Container>
    </>
  )
}
