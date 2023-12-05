import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from './Security/Auth';

function HeaderComponent() {
    const { isAuthenticated, logout, username } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar">
          <Container>
            <Navbar.Brand>MB</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  {isAuthenticated && <Link to={`/welcome/${username}`} className="nav-link">Home</Link>}
                  {isAuthenticated && <Link to={`/todos/${username}`} className="nav-link">Todo</Link>}
                  {isAuthenticated && <Link to={`/daily/${username}`} className="nav-link">DailyRoutine</Link>}
              </Nav>
              <Nav>
                  {!isAuthenticated &&<Link to="/login" className="nav-link">Login</Link>}
                  {!isAuthenticated && <Link to="/register" className="nav-link">Register</Link>}
                  {isAuthenticated && <Link to="/logout" className="nav-link" onClick={logout}>Logout</Link>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }

export default HeaderComponent;