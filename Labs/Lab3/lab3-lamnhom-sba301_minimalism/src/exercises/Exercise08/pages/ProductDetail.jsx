import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) navigate('/404');
  }, [product, navigate]);

  return (
    <Container className="mt-4" data-testid="product-detail">
      <Button
        variant="outline-secondary"
        className="mb-4"
        data-testid="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Quay Lại
      </Button>

      {product && (
        <Row className="g-4">
          <Col md={5}>
            <Card.Img src={product.image} style={{ borderRadius: 8 }} />
          </Col>
          <Col md={7}>
            <h2>{product.name}</h2>
            <Badge bg="info" className="mb-3">{product.category}</Badge>
            <h3 className="text-danger">{product.price.toLocaleString('vi-VN')}đ</h3>
            <ListGroup variant="flush" className="mt-3">
              <ListGroup.Item>⭐ Đánh giá: {product.rating}/5</ListGroup.Item>
              <ListGroup.Item>📦 Còn hàng: {product.stock} sản phẩm</ListGroup.Item>
              <ListGroup.Item>🏷️ Danh mục: {product.category}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" size="lg" className="mt-4">
              Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
