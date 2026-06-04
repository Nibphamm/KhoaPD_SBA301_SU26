import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  role: 'User',
  status: 'active',
}

// Modal thêm/sửa user (có validation)
// Props: show, onHide, onSubmit, user (null = thêm mới), loading
export default function UserForm({ show, onHide, onSubmit, user, loading }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  // Điền data khi chỉnh sửa, reset khi thêm mới
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [user, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Họ tên không được để trống.'
    else if (form.fullName.length < 3)
      e.fullName = 'Họ tên phải có ít nhất 3 ký tự.'

    if (!form.email.trim()) e.email = 'Email không được để trống.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email không hợp lệ.'

    if (!form.phone.trim()) e.phone = 'Số điện thoại không được để trống.'
    else if (!/^0\d{9}$/.test(form.phone))
      e.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.'

    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit(form) // gọi handler từ UsersPage
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? 'Sửa người dùng' : 'Thêm người dùng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              name="phone"
              value={form.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
