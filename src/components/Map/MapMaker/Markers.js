import React, { useState, useEffect } from 'react';

import { Marker } from 'react-leaflet/Marker';
import { Circle } from 'react-leaflet'

import BusIcon from '../MarkerIcons/BusIcon';
import TrainIcon from '../MarkerIcons/TrainIcon';
import FerryIcon from '../MarkerIcons/FerryIcon';
import VehiclePopUp from './VehiclePopUp';

export default function Markers({ routes, refreshTime, routeFilter, hideInvalid = true }) {
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    //Fetch vehicle locations data from AT and save it to the vehicle state
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

  //Make vehicle markers if vehicles are found
  let markers = vehicles;
  if (markers) {

    //Filter if needed
    if (routeFilter.length !== 0) {
      markers = markers.filter(vehicle => {
        if (vehicle.vehicle.trip) {
          let routeName = routes[vehicle.vehicle.trip.route_id].route_long_name;
          
          for (let i = 0; i < routeFilter.length; i++) {
            if (routeFilter[i] === routeName) {
              //Return true if route of vehicle is in filter list
              return true;
            }
          }
        }

        //Return false because vehicle does not have a route or has a route that is not in the filter list
        return false;
      });
    }

    //Make markers for the vehicles for the map
    let keyIndex = 0;
    markers = markers.map(vehicle => {
      let colour;
      let vehicleData = vehicle.vehicle;

      //Increase the array index
      keyIndex++;

      //Only make a vehicle marker for vehicle with trips
      if (vehicleData.trip) {
        let route = routes[vehicleData.trip.route_id];
        if (route) {
          
          //Check the type of vehicle
          if (route.route_type === 2) { //Train
            colour = "yellow";

            return (
              <Marker
                key={keyIndex}
                position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                icon={TrainIcon(colour)}
              >
                <VehiclePopUp route={route} vehicleData={vehicleData} />
              </Marker>
            );

          } else if ((route.route_type === 3) || (route.route_type === 712)) { //Bus (including school bus)
            colour = "lime";

            return (
              <Marker
                key={keyIndex}
                position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                icon={BusIcon(colour)}
              >
                <VehiclePopUp route={route} vehicleData={vehicleData} />
              </Marker>
            );

          } else if (route.route_type === 4) { //Ferry
            colour = "aqua";

            return (
              <Marker
                key={keyIndex}
                position={[vehicleData.position.latitude, vehicleData.position.longitude]}
                icon={FerryIcon(colour)}
              >
                <VehiclePopUp route={route} vehicleData={vehicleData} />
              </Marker>
            );
          }
        }
      }
      
      //Return null for the current vehicle if hide invalid is true
      if (hideInvalid === true) {
        return null;
      }

      //Return a circle at the location of the invalid vehicle
      return (
        <Circle
          key={keyIndex}
          center={[vehicle.vehicle.position.latitude, vehicle.vehicle.position.longitude]}
          radius={20}
        />
      );
    });
  }

  return markers;
};
