import React from 'react';
import { Tooltip } from 'react-leaflet/Tooltip';

export default function VehiclePopUp({ route, vehicleData }) {
  return (
    <Tooltip>
      <b>{vehicleData.vehicle.label}</b>
      <br/>
      Route: {route.route_long_name}
      <br/>
      Speed: {Math.round(vehicleData.position.speed)} km/h
    </Tooltip>
  );
};
