import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FlowerCard from './components/FlowerCard';
import BannerCarousel from './components/BannerCarousel';
import { flowers } from './data/orchidsData';

function App() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Single Page Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mb-5 mt-4">
        {/* Banner Section */}
        <BannerCarousel />

        {/* Flowers Grid Section */}
        <h2 className="mb-4">Our Orchids</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {flowers.map((flower, index) => (
            <Col key={index}>
              <FlowerCard 
                image={flower.url} 
                title={flower.name} 
                subtitle={flower.category} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default App;
