import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { products, categories } from '../../data/products';

export default function ProductFilter() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products
    .filter((p) => selectedCategory === 'Tất cả' || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container className="mt-4">
      <h4 className="mb-4">🛍️ Danh Sách Sản Phẩm</h4>

      <Row className="mb-3 g-2">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-input"
            />
          </InputGroup>
        </Col>

        <Col md={7}>
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                data-testid={`filter-${category}`}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      <div className="mb-3">
        <Badge bg="secondary" data-testid="product-count">
          Tìm thấy {filteredProducts.length} sản phẩm
        </Badge>
      </div>

      <Row className="g-3" data-testid="product-list">
        {filteredProducts.length === 0 ? (
          <Col xs={12}>
            <div className="text-center text-muted py-5">
              Không tìm thấy sản phẩm nào.
            </div>
          </Col>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card data-testid={`product-card-${product.id}`} className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: 180, objectFit: 'cover' }}
                />
                <Card.Body>
                  <Badge bg="info" className="mb-2">{product.category}</Badge>
                  <Card.Title style={{ fontSize: '0.95rem' }}>{product.name}</Card.Title>
                  <div className="fw-bold text-danger">
                    {product.price.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Còn {product.stock} sản phẩm
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}