import { useState } from 'react';

import AppNavBar from "./components/Navbar/NavBar";
import Info from './pages/Info';
import Global from './pages/Global';
import Train from './pages/Train';
import Ferry from './pages/Ferry';
import Routes from './pages/Routes';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'info':
        return <Info/>;
      case 'global':
        return <Global/>;
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

export default App;
