import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const EMPTY_FORM = { name: '', email: '', phone: '', age: '' };
const EMPTY_ERRORS = { name: '', email: '', phone: '', age: '' };

export default function RegistrationForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { name: '', email: '', phone: '', age: '' };

    if (!formData.name) {
      newErrors.name = 'Họ tên là bắt buộc';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải gồm đúng 10 chữ số';
    }

    if (formData.age === '' || formData.age === null) {
      newErrors.age = 'Tuổi là bắt buộc';
    } else {
      const ageNum = Number(formData.age);
      if (Number.isNaN(ageNum) || ageNum < 16 || ageNum > 60) {
        newErrors.age = 'Tuổi phải từ 16 đến 60';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((v) => v !== '');
    if (!hasError) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setSubmitted(false);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          {submitted ? (
            <Alert variant="success" data-testid="success-message">
              Đăng ký thành công! Chào mừng {formData.name}.
              <div className="mt-2">
                <Button variant="link" onClick={handleReset}>
                  Đăng ký tài khoản khác
                </Button>
              </div>
            </Alert>
          ) : (
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">📋 Form Đăng Ký</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và Tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Nhập họ và tên"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      data-testid="name-input"
                    />
                    {errors.name && (
                      <Form.Control.Feedback type="invalid" data-testid="name-error">
                        {errors.name}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      data-testid="email-input"
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid" data-testid="email-error">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số Điện Thoại <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="phone"
                      placeholder="0xxxxxxxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      data-testid="phone-input"
                    />
                    {errors.phone && (
                      <Form.Control.Feedback type="invalid" data-testid="phone-error">
                        {errors.phone}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="age"
                      type="number"
                      placeholder="16–60"
                      value={formData.age}
                      onChange={handleChange}
                      isInvalid={!!errors.age}
                      data-testid="age-input"
                    />
                    {errors.age && (
                      <Form.Control.Feedback type="invalid" data-testid="age-error">
                        {errors.age}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success" data-testid="submit-btn">
                      Đăng Ký
                    </Button>
                    <Button type="button" variant="outline-secondary" onClick={handleReset}>
                      Làm Lại
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}