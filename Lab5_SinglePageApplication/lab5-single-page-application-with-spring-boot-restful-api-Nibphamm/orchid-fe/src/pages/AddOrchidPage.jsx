import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Breadcrumb, Alert, Card } from 'react-bootstrap'
import { useOrchid } from '../context/OrchidContext.jsx'
import OrchidForm from '../components/OrchidForm.jsx'

function AddOrchidPage() {
  const { addOrchid } = useOrchid()
  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    setSaving(true)
    setError('')
    try {
      await addOrchid(data)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.message || 'Thêm orchid thất bại')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container className="my-4" style={{ maxWidth: 720 }}>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add Orchid</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-4">Add New Orchid</h2>

      {success && <Alert variant="success">Thêm orchid thành công! Đang chuyển về trang chủ...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <OrchidForm onSubmit={handleSubmit} submitLabel="Add Orchid" loading={saving} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddOrchidPage
