import Container from 'react-bootstrap/Container';

export default function Info() {
  return (
    <Container style={{ paddingTop: '10px' }}>
      <h2>What is this?</h2>
      <p>
        This is a React-based website which shows Auckland Transport (AT) vehicle data. The data is sourced from AT's public API
        and the routes are drawn by OpenStreetMap's public API. I completed this as a project to mess around with large data APIs
        within React.
      </p>

      <h2>Limitations</h2>
      <ul>
        <li>
          AT's vehicles are only trackable while they are active and connected. This means vehicles are normally only trackable during
          hours which the vehicles run and that once the vehicle is turned off, the vehicle's data disappears. There are also times
          when the tracker on the vehicle might be broken, in this case, errors may appear (e.g. wrong speed, wrong location, doesn't
          track).
        </li>
        <li>
          OpenStreetMap's data is open sourced which means anyone can update the data to fix any errors (similar to Wikipedia) but
          this means there is human error in the data. OpenStreetMap's data also doesn't automatically update which means there might
          be errors with routes and stop locations. To help with this, I have gone over some of the routes on OpenStreetMap and fixed
          some of them.
        </li>
      </ul>
      
      <h2>Pages</h2>
      <ul>
        <li>
          <b>Global View -</b> Global view is a live auto-updating map of all active Auckland Transport (and partners) vehicles. There
          are three different types of vehicles, Bus, Train, and Ferry. Each is marked with its own marker shape.
        </li>
        <li>
          <b>Route View -</b> Route view allows you to see only the vehicles of the selected route. This view also shows a route map and
          any stop within it.
        </li>
      </ul>

      <h2>References</h2>
      <ul>
        <li>
          <b>Auckland Transport -</b> All vehicle data, including routes.
        </li>
        <li>
          <b>OpenStreetMap -</b> The map layer, vehicle routes, and vehicle stops.
        </li>
        <li>
          <b>Leaflet -</b> The map, markers, and pop-ups.
        </li>
        <li>
          <b>React Leaflet -</b> React version of Leaflet.
        </li>
      </ul>
    </Container>
  );
}
