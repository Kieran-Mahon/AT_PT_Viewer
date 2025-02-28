import { useState, useEffect } from 'react'

export default function FetchHeadSign({ trip_id }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch('https://api-proxy.auckland-cer.cloud.edu.au/AT/gtfs/v3/trips/' + trip_id, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '7ddfd9ea87aa41dc9fe4efb9a5318dd5',
      }
    })
    .then(response => response.json())
    .then(response => {
      setResponse(response.data.attributes.trip_headsign);
    })
    .catch(error => console.log(error))
  }, [trip_id]);

  return response;
};
