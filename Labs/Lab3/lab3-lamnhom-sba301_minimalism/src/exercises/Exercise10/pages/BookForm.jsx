import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooksFromStorage, saveBooksToStorage, getNextId } from '../utils/storage';
import { genres } from '../../../data/books';

const EMPTY_FORM = { title: '', author: '', genre: 'Lập trình', year: '', price: '', available: true };

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      const books = getBooksFromStorage();
      const book = books.find((b) => b.id === Number(id));
      if (book) {
        setFormData(book);
      } else {
        navigate('/books');
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || formData.year === '' || formData.price === '') {
      setError('Vui lòng điền đầy đủ Tên sách, Tác giả, Năm và Giá');
      return;
    }
    const yearNum = Number(formData.year);
    if (Number.isNaN(yearNum) || yearNum < 1900 || yearNum > 2025) {
      setError('Năm xuất bản phải từ 1900 đến 2025');
      return;
    }
    const priceNum = Number(formData.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setError('Giá phải là số dương');
      return;
    }

    const books = getBooksFromStorage();
    const payload = { ...formData, year: yearNum, price: priceNum };
    let updated;
    if (isEdit) {
      updated = books.map((b) => (b.id === Number(id) ? { ...b, ...payload } : b));
    } else {
      updated = [...books, { ...payload, id: getNextId(books) }];
    }
    saveBooksToStorage(updated);
    navigate('/books');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm" data-testid="book-form">
            <Card.Header className={isEdit ? 'bg-warning' : 'bg-primary text-white'}>
              <h5 className="mb-0">{isEdit ? '✏️ Sửa Sách' : '+ Thêm Sách Mới'}</h5>
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Sách <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Nhập tên sách..."
                    value={formData.title}
                    onChange={handleChange}
                    data-testid="book-title-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tác Giả <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="author"
                    placeholder="Tên tác giả..."
                    value={formData.author}
                    onChange={handleChange}
                    data-testid="book-author-input"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Thể Loại</Form.Label>
                      <Form.Select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        data-testid="book-genre-select"
                      >
                        {genres.filter((g) => g !== 'Tất cả').map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Năm Xuất Bản <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        name="year"
                        type="number"
                        placeholder="2024"
                        value={formData.year}
                        onChange={handleChange}
                        data-testid="book-year-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Giá (VNĐ) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="150000"
                    value={formData.price}
                    onChange={handleChange}
                    data-testid="book-price-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="available"
                    label="Còn hàng"
                    checked={formData.available}
                    onChange={handleChange}
                    data-testid="book-available-check"
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant={isEdit ? 'warning' : 'primary'}
                    data-testid="save-book-btn"
                  >
                    {isEdit ? '💾 Lưu Thay Đổi' : '+ Thêm Sách'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/books')}
                    data-testid="cancel-book-btn"
                  >
                    Hủy
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}