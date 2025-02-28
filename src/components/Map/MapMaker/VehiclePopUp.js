import React, { useState } from 'react';

import { Tooltip } from 'react-leaflet/Tooltip';
import FetchHeadSign from './FetchHeadSign';

export default function VehiclePopUp({ route, vehicleData }) {
  const [headsign, setheadsign] = useState("");

  return (
    <Tooltip
      eventHandlers={{
        add: () => {
          if(headsign === "") {
            setheadsign(<FetchHeadSign trip_id={vehicleData.trip.trip_id} />);
          }
        },
      }}
      interactive
    >
      <b>{vehicleData.vehicle.label}</b>
      <br/>
      Route: {route.route_long_name}
      <br/>
      {headsign}
      <br/>
      Speed: {Math.round(vehicleData.position.speed)} km/h
    </Tooltip>
  );
};
