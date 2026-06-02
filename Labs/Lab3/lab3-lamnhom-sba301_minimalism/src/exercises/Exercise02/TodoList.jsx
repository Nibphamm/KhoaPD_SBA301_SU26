import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
  InputGroup,
  Alert,
} from "react-bootstrap";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📝 Danh Sách Công Việc</h5>
            </Card.Header>

            <Card.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Nhập công việc mới..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTodo();
                  }}
                  data-testid="todo-input"
                />
                <Button
                  variant="primary"
                  onClick={addTodo}
                  data-testid="add-btn"
                >
                  Thêm
                </Button>
              </InputGroup>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                <Badge bg="primary" data-testid="total-count">
                  Tổng: {todos.length}
                </Badge>
                <Badge bg="success" data-testid="completed-count">
                  Hoàn thành: {completedCount}
                </Badge>
                <Badge bg="warning" text="dark" data-testid="pending-count">
                  Chưa xong: {pendingCount}
                </Badge>
              </div>

              {todos.length === 0 && (
                <Alert variant="info" data-testid="empty-message">
                  Chưa có công việc nào! Hãy thêm việc mới.
                </Alert>
              )}

              <ListGroup as="ul">
                {todos.map((todo) => (
                  <ListGroup.Item
                    as="li"
                    key={todo.id}
                    data-testid={`todo-item-${todo.id}`}
                    className="d-flex align-items-center gap-2"
                  >
                    <Form.Check
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      data-testid={`toggle-${todo.id}`}
                    />
                    <span
                      style={
                        todo.completed
                          ? { textDecoration: "line-through", color: "#aaa" }
                          : undefined
                      }
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-auto"
                      onClick={() => deleteTodo(todo.id)}
                      data-testid={`delete-btn-${todo.id}`}
                    >
                      Xóa
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
