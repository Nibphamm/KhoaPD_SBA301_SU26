import { useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  const statusVariant =
    count >= 10 ? "danger" : count > 0 ? "success" : "secondary";
  const statusText = count >= 10 ? "Cao" : count > 0 ? "Đang chạy" : "Bắt đầu";

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="text-center shadow-sm">
          <Card.Header as="h4" className="bg-primary text-white">
            Bộ Đếm
          </Card.Header>

          <Card.Body>
            <h1 className="display-1 fw-bold" data-testid="counter-value">
              {count}
            </h1>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                variant="danger"
                size="lg"
                data-testid="decrement-btn"
                onClick={decrement}
              >
                −
              </Button>
              <Button
                variant="secondary"
                size="lg"
                data-testid="reset-btn"
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                variant="success"
                size="lg"
                data-testid="increment-btn"
                onClick={increment}
              >
                +
              </Button>
            </div>
          </Card.Body>

          <Card.Footer>
            <Badge bg={statusVariant} data-testid="counter-status">
              {statusText}
            </Badge>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
