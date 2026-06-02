import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert } from 'react-bootstrap';
import { products } from '../../data/products';

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container fluid className="mt-4 px-4">
      <h4 className="mb-4">🛒 Cửa Hàng</h4>

      <Row>
        <Col lg={7}>
          <h5 className="mb-3">
            Sản phẩm{' '}
            <Badge bg="secondary" data-testid="cart-count">
              {cartItemCount}
            </Badge>
          </h5>

          <Row className="g-3">
            {products.map((product) => {
              const inCart = cart.find((c) => c.id === product.id);
              return (
                <Col key={product.id} xs={12} sm={6} xl={4}>
                  <Card data-testid={`product-${product.id}`} className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: 140, objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title style={{ fontSize: '0.9rem' }}>{product.name}</Card.Title>
                      <div className="fw-bold text-danger mb-auto">
                        {product.price.toLocaleString('vi-VN')}đ
                      </div>
                      <Button
                        variant={inCart ? 'success' : 'primary'}
                        size="sm"
                        className="mt-2"
                        data-testid={`add-to-cart-${product.id}`}
                        onClick={() => addToCart(product)}
                      >
                        {inCart ? `✓ Đã thêm (${inCart.quantity})` : 'Thêm vào giỏ'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm sticky-top" style={{ top: 16 }}>
            <Card.Header className="bg-warning">
              <h5 className="mb-0">🛍️ Giỏ Hàng ({cartItemCount ?? 0} sản phẩm)</h5>
            </Card.Header>

            <Card.Body style={{ maxHeight: 400, overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <Alert variant="secondary">Giỏ hàng trống</Alert>
              ) : (
                <Table size="sm" responsive>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} data-testid={`cart-item-${item.id}`}>
                        <td>{item.name}</td>
                        <td className="text-center">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            data-testid={`decrease-qty-${item.id}`}
                            onClick={() => decreaseQty(item.id)}
                          >
                            −
                          </Button>
                          <span data-testid={`quantity-${item.id}`} className="mx-2">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            data-testid={`increase-qty-${item.id}`}
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </Button>
                        </td>
                        <td className="text-end text-danger fw-bold">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            data-testid={`remove-from-cart-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                          >
                            ✕
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>

            <Card.Footer className="text-end">
              <strong>
                Tổng cộng:{' '}
                <span className="text-danger" data-testid="cart-total">
                  {cartTotal.toLocaleString('vi-VN')}đ
                </span>
              </strong>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
