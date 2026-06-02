import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active fw-bold' : 'nav-link';

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">⚛️ SBA301</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <NavLink to="/" end data-testid="nav-home" className={linkClass}>
              Trang Chủ
            </NavLink>
            <NavLink to="/about" data-testid="nav-about" className={linkClass}>
              Giới Thiệu
            </NavLink>
            <NavLink to="/contact" data-testid="nav-contact" className={linkClass}>
              Liên Hệ
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
