import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Breadcrumb, Alert, Spinner, Card } from 'react-bootstrap'
import { useOrchid } from '../context/OrchidContext.jsx'
import { getOrchidById } from '../utils/orchidApi.js'
import OrchidForm from '../components/OrchidForm.jsx'

function EditOrchidPage() {
  const { id } = useParams()
  const { editOrchid } = useOrchid()
  const navigate = useNavigate()

  const [orchid, setOrchid] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setFetching(true)
      setError('')
      try {
        const res = await getOrchidById(id)
        if (active) setOrchid(res.data)
      } catch (err) {
        if (active) setError(err.response?.status === 404 ? 'Không tìm thấy orchid' : (err.message || 'Tải dữ liệu thất bại'))
      } finally {
        if (active) setFetching(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [id])

  const handleSubmit = async (data) => {
    setSaving(true)
    setError('')
    try {
      await editOrchid(id, data)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.message || 'Cập nhật thất bại')
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
        <Breadcrumb.Item active>Edit Orchid #{id}</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-4">Edit Orchid #{id}</h2>

      {success && <Alert variant="success">Cập nhật thành công! Đang chuyển về trang chủ...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {fetching ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : (
        orchid && (
          <Card className="shadow-sm">
            <Card.Body>
              <OrchidForm
                initialData={orchid}
                onSubmit={handleSubmit}
                submitLabel="Update Orchid"
                loading={saving}
              />
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  )
}

export default EditOrchidPage
