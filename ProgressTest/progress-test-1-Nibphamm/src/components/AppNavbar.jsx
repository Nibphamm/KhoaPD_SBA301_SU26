import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { user } = state

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          <Nav.Link as={NavLink} to="/">
            Dashboard
          </Nav.Link>
          {user?.role === 'admin' && (
            <Nav.Link as={NavLink} to="/users">
              Quản lý Users
            </Nav.Link>
          )}
        </Nav>
        <Navbar.Text>{user?.name}</Navbar.Text>
        <Button variant="outline-light" onClick={() => dispatch({ type: 'LOGOUT' })}>
          Đăng xuất
        </Button>
      </Container>
    </Navbar>
  )
}
