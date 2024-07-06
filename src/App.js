import { useState, useEffect } from 'react';

import AppNavBar from "./components/Navbar/NavBar";
import Info from './pages/Info';
import Global from './pages/Global';
import Train from './pages/Train';
import Ferry from './pages/Ferry';
import Routes from './pages/Routes';

export default function App() {
  //Get list of routes
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    fetch('https://api-proxy.auckland-cer.cloud.edu.au/AT/gtfs/v3/routes', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '7ddfd9ea87aa41dc9fe4efb9a5318dd5',
      }
    })
    .then(response => response.json())
    .then(response => {
      let tempRoutes = [];
      for (var route of response.data) {
        tempRoutes[route.id] = route.attributes;
      }
      setRoutes(tempRoutes)
    })
    .catch(error => console.log(error))
  }, []);

  //Active page control
  const [activePage, setActivePage] = useState('home');
  const renderPage = () => {
    switch (activePage) {
      case 'info':
        return <Info/>;
      case 'global':
        return <Global routes={routes}/>;
      case 'train':
        return <Train/>;
      case 'ferry':
        return <Ferry/>;
      case 'routes':
        return <Routes/>;
      default:
        return <Info/>;
    }
  };

  return (
    <>
      <div className="App">
        <AppNavBar setActivePage={setActivePage}/>
        {renderPage()}


      </div>
    </>
  );
}
