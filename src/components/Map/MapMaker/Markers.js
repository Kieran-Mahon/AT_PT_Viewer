import React, { useState, useEffect } from 'react';

import { Marker } from 'react-leaflet/Marker'
import { Circle } from 'react-leaflet'

import BusIcon from '../MarkerIcons/BusIcon';
import TrainIcon from '../MarkerIcons/TrainIcon';
import FerryIcon from '../MarkerIcons/FerryIcon';
import VehiclePopUp from './VehiclePopUp';

export default function Markers({routes, refreshTime}) {
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-proxy.auckland-cer.cloud.edu.au/AT/realtime/legacy/vehiclelocations', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '763b2ff00d474b29bc64acd6811517bb',
          }
        });
        const result = await response.json();
        setVehicles(result.response.entity);

      } catch (error) {
        console.log(error);
      }
    }

    //Fetch data on component creation
    fetchData();
    
    //Fetch data every refresh time
    const intervalId = setInterval(fetchData, refreshTime);

    //Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let markers = null;
  if (vehicles) {
    markers = vehicles.map(vehicle => {
      let colour;
      let vehicleData = vehicle.vehicle;
      if (vehicleData.trip) {
        let route = routes[vehicleData.trip.route_id];
        if (route) {
          if (route.route_type === 2) {
            colour = "yellow";
            return (
              <>
                <Marker
                  position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                  icon={TrainIcon(colour)}
                  key={vehicle.id}
                >
                  <VehiclePopUp route={route} vehicleData={vehicleData}/>
                </Marker>
              </>
            );

          } else if ((route.route_type === 3) || (route.route_type === 712)) {
            colour = "lime";
            return (
              <>
                <Marker
                  position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                  icon={BusIcon(colour)}
                  key={vehicle.id}
                >
                  <VehiclePopUp route={route} vehicleData={vehicleData}/>
                </Marker>
              </>
            );

          } else if (route.route_type === 4) {
            colour = "aqua";
            return (
              <>
                <Marker
                  position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                  icon={FerryIcon(colour)}
                  key={vehicle.id}
                >
                  <VehiclePopUp route={route} vehicleData={vehicleData}/>
                </Marker>
              </>
            );
          }
        }
      }
      /*
      return (
        <>
          <Circle
            center={[vehicle.vehicle.position.latitude, vehicle.vehicle.position.longitude]}
            radius={20}
          />
        </>
      );
      */
      return null;
    });
  }
  return markers;
};
