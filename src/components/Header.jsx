import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/FIFA_logo_without_slogan.svg.png';
function Header() {
  const location = useLocation();
  
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <div className="d-flex align-items-center me-4">
          <img
            src={Logo}
            alt="FIFA"
            height="30"
            className="d-inline-block align-top"
          />
        </div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap-3">
            <Nav.Link 
              as={Link} 
              to="/leagues" 
              className={location.pathname === '/leagues' || location.pathname.startsWith('/leagues/') ? 'active-nav-link' : ''}
            >
              Лиги
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/teams"
              className={location.pathname === '/teams' || location.pathname.startsWith('/teams/') ? 'active-nav-link' : ''}
            >
              Команды
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;