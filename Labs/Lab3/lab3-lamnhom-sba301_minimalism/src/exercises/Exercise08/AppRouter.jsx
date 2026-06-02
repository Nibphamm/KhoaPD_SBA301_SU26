import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

export default function AppRouter() {
  return (
    <MemoryRouter>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand>🛍️ Cửa Hàng</Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/" end>
              Sản Phẩm
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}
