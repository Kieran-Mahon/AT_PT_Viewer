import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppNavBar({ setActivePage }) {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>AT PT Viewer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActivePage('info')}>Info</Nav.Link>
            <Nav.Link onClick={() => setActivePage('global')}>Global View</Nav.Link>
            <Nav.Link onClick={() => setActivePage('route')}>Route View</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
/*
            Nav.Link onClick={() => setActivePage('info')}>Info</Nav.Link>
            <Nav.Link onClick={() => setActivePage('global')}>Global View</Nav.Link>
            <Nav.Link onClick={() => setActivePage('train')}>Train</Nav.Link>
            <Nav.Link onClick={() => setActivePage('ferry')}>Ferry</Nav.Link>
            <Nav.Link onClick={() => setActivePage('route')}>Route View</Nav.Link>
*/
