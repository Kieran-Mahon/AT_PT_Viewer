import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function Map({ passedFunction }) {
  const mapOptions = {
    center: [-36.8747, 174.7739],
    zoom: 12,
    attributionControl: false,
  };

  return (
    <MapContainer {...mapOptions} style={{ height: '700px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {passedFunction()}
    </MapContainer>
  );
  /*  Google Map Layer
      <TileLayer
        url={`http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}`}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
  */
};
