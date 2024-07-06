import React from 'react';
import { Popup } from 'react-leaflet/Popup'

export default function VehiclePopUp({route, vehicleData}) {
  return (
    <Popup>
      Route: {route.route_long_name}
      <br/>
      Speed: {Math.round(vehicleData.position.speed)} km/h
    </Popup>
  );
};
