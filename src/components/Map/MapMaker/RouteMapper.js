import React from 'react';
import { useState, useEffect } from 'react';

import { Circle, Polyline } from 'react-leaflet';

export default function RouteMapper({ routeRef }) {
  //Get route data (nodes, connections between nodes, stops)
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: "data="+ encodeURIComponent(`
        [out:json];
        (
          relation["type"="route"]["network"="AT"]["ref"="` + routeRef + `"];
        );
        out body;
        >;
        out skel qt;
      `)
    })
    .then(response => response.json())
    .then(response => {
      setData(response.elements);
    })
    .catch(error => console.log(error))
  }, [routeRef]);
  
  //Return if no data
  if (!data) return null;

  //Split the data up into the correct collections
  let nodeMap = [];
  let spotArray = [];
  let wayArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'relation') { //Stops - stop locations
      for (let j = 0; j < data[i].members.length; j++) {
        if (data[i].members[j].type === 'node') {
          spotArray.push(data[i].members[j].ref);
        }
      }
    } else if (data[i].type === 'node') { //Nodes - nodes of the route
      nodeMap[data[i].id] = data[i];
    } else if (data[i].type === 'way') { //Ways - connections between nodes (not stops)
      wayArray.push(data[i]);
    }
  }

  //Start to add the return JSX
  let returnJSX = [];
  let color = "blue"; //JSX colors

  //Add nodes and connections between nodes
  let keyIndex = 0;
  for (let i = 0; i < wayArray.length; i++) {
    if (wayArray[i].nodes) {

      //Get all locations of nodes to be connected
      let cords = []
      for (let j = 0; j < wayArray[i].nodes.length; j++) {
        let lat = nodeMap[wayArray[i].nodes[j]].lat;
        let lon = nodeMap[wayArray[i].nodes[j]].lon;
        cords.push([lat, lon]);
      }
      
      //Add a Polyline between the nodes to be connected
      returnJSX.push(<Polyline key={keyIndex++} positions={cords} color={color} />);
    }
  }

  //Add stops
  for (let i = 0; i < spotArray.length; i++) {
    let lat = nodeMap[spotArray[i]].lat;
    let lon = nodeMap[spotArray[i]].lon;
    returnJSX.push(<Circle key={keyIndex++} center={[lat, lon]} radius={20} />);
  }

  //Return the route JSX
  return returnJSX;
};
