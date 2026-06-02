import { useState } from 'react';
import {
  Container, Row, Col, Table, Button, Badge, Form,
  Modal, Alert, InputGroup,
} from 'react-bootstrap';
import { initialStudents, classNames, statusOptions } from '../../data/students';

const EMPTY_FORM = { name: '', studentId: '', className: 'SE1701', gpa: '', status: 'Đang học' };

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [filterClass, setFilterClass] = useState('Tất cả');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      studentId: student.studentId,
      className: student.className,
      gpa: student.gpa,
      status: student.status,
    });
    setFormError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.studentId || formData.gpa === '') {
      setFormError('Vui lòng điền đầy đủ Họ Tên, MSSV và GPA');
      return;
    }
    const gpaNum = Number(formData.gpa);
    if (Number.isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setFormError('GPA phải là số từ 0.0 đến 4.0');
      return;
    }

    if (editingId === null) {
      const newStudent = { ...formData, id: Date.now(), gpa: gpaNum };
      setStudents((prev) => [...prev, newStudent]);
    } else {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...formData, gpa: gpaNum } : s
        )
      );
    }
    setShowModal(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStudents =
    filterClass === 'Tất cả'
      ? students
      : students.filter((s) => s.className === filterClass);

  const gpaColor = (gpa) => {
    if (gpa >= 3.6) return 'success';
    if (gpa >= 3.0) return 'primary';
    if (gpa >= 2.0) return 'warning';
    return 'danger';
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="mb-0">🎓 Quản Lý Sinh Viên</h4>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            data-testid="add-student-btn"
            onClick={openAddModal}
          >
            + Thêm sinh viên
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            data-testid="filter-class"
          >
            {classNames.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto" className="align-self-center">
          <Badge bg="secondary" data-testid="student-count">
            {filteredStudents.length} sinh viên
          </Badge>
        </Col>
      </Row>

      <Table striped bordered hover responsive data-testid="student-table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Họ Tên</th>
            <th>MSSV</th>
            <th>Lớp</th>
            <th>GPA</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s, index) => (
            <tr key={s.id} data-testid={`student-row-${s.id}`}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.studentId}</td>
              <td>{s.className}</td>
              <td><Badge bg={gpaColor(s.gpa)}>{s.gpa}</Badge></td>
              <td>{s.status}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-warning"
                  className="me-1"
                  data-testid={`edit-btn-${s.id}`}
                  onClick={() => openEditModal(s)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  data-testid={`delete-btn-${s.id}`}
                  onClick={() => deleteStudent(s.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        data-testid="student-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId === null ? 'Thêm Sinh Viên' : 'Sửa Sinh Viên'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                data-testid="modal-name-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MSSV</Form.Label>
              <Form.Control
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                data-testid="modal-studentid-input"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Lớp</Form.Label>
                  <Form.Select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    data-testid="modal-class-select"
                  >
                    {classNames.filter((c) => c !== 'Tất cả').map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>GPA</Form.Label>
                  <Form.Control
                    name="gpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={formData.gpa}
                    onChange={handleChange}
                    data-testid="modal-gpa-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                data-testid="modal-status-select"
              >
                {statusOptions.map((s) => <option key={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button
            variant="primary"
            data-testid="save-student-btn"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </Container>
  );
}
