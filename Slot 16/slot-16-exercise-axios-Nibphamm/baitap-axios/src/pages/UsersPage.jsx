import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Table,
  Button,
  Badge,
  Spinner,
  Navbar,
  Form,
  Row,
  Col,
  Alert,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { userApi } from '../api/userApi'
import { useAuth } from '../context/AuthContext'
import UserForm from '../components/UserForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState(null)

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const showToast = (message, type = 'success') => setToast({ message, type })

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (filterRole) params.role = filterRole
      const { data } = await userApi.getAll(params)
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filterRole])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search),
  )

  const handleAdd = () => {
    setEditUser(null)
    setFormError('')
    setShowForm(true)
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setFormError('')
    setShowForm(true)
  }

  const handleSubmit = async (formData) => {
    setFormLoading(true)
    setFormError('')
    try {
      if (editUser) {
        await userApi.update(editUser.id, { ...editUser, ...formData })
        showToast('Cập nhật thành công!')
      } else {
        await userApi.create(formData)
        showToast('Thêm người dùng thành công!')
      }
      setShowForm(false)
      fetchUsers()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    try {
      await userApi.patch(user.id, { status: newStatus })
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
      )
    } catch {
      showToast('Cập nhật trạng thái thất bại.', 'error')
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await userApi.remove(deleteTarget.id)
      showToast(`Đã xóa '${deleteTarget.fullName}' thành công.`)
      setDeleteTarget(null)
      fetchUsers()
    } catch {
      showToast('Xóa thất bại.', 'error')
      setDeleteTarget(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isAdmin = currentUser?.role === 'Admin'
  const canEdit = isAdmin || currentUser?.role === 'Manager'

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3 mb-4">
        <Navbar.Brand>Quản lý người dùng</Navbar.Brand>
        <div className="ms-auto d-flex align-items-center gap-3 text-light">
          <span>
            {currentUser?.fullName} ({currentUser?.role})
          </span>
          <Button size="sm" variant="outline-light" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Navbar>

      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Danh sách người dùng</h4>
          {canEdit && <Button onClick={handleAdd}>+ Thêm mới</Button>}
        </div>

        <Row className="mb-3 g-2">
          <Col md={8}>
            <Form.Control
              placeholder="Tìm theo tên / email / SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">-- Tất cả vai trò --</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </Form.Select>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Badge
                      bg={user.status === 'active' ? 'success' : 'secondary'}
                      style={{ cursor: canEdit ? 'pointer' : 'default' }}
                      onClick={() => canEdit && handleToggleStatus(user)}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td>{user.createdAt}</td>
                  <td className="d-flex gap-2">
                    {canEdit && (
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(user)}
                      >
                        Sửa
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => setDeleteTarget(user)}
                      >
                        Xóa
                      </Button>
                    )}
                    {!canEdit && <span className="text-muted">Chỉ xem</span>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>

      <UserForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleSubmit}
        user={editUser}
        loading={formLoading}
      />
      {formError && (
        <Alert variant="danger" className="position-fixed bottom-0 start-0 m-3">
          {formError}
        </Alert>
      )}

      <ConfirmDialog
        show={!!deleteTarget}
        onHide={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        message={`Bạn có chắc chắn muốn xóa '${deleteTarget?.fullName}'?`}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={!!toast}
          onClose={() => setToast(null)}
          delay={3000}
          autohide
          bg={toast?.type === 'error' ? 'danger' : 'success'}
        >
          <Toast.Body className="text-white">{toast?.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
