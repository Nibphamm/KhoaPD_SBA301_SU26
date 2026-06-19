import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap'
import { useOrchid } from '../context/OrchidContext.jsx'
import OrchidTable from '../components/OrchidTable.jsx'
import OrchidCard from '../components/OrchidCard.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'

function HomePage() {
  const { orchids, loading, error, fetchOrchids, removeOrchid } = useOrchid()
  const navigate = useNavigate()

  const [view, setView] = useState('table')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchOrchids()
  }, [fetchOrchids])

  const handleEdit = (id) => navigate(`/edit/${id}`)

  const handleAskDelete = (id) => {
    const target = orchids.find((o) => o.orchidId === id)
    setDeleteTarget(target ?? null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeOrchid(deleteTarget.orchidId)
      setDeleteTarget(null)
    } catch (err) {
      alert(err.message || 'Xóa thất bại')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="mb-0">Orchid List</h2>
        <div className="d-flex gap-2">
          <ButtonGroup>
            <Button
              variant={view === 'table' ? 'primary' : 'outline-primary'}
              onClick={() => setView('table')}
            >
              Table
            </Button>
            <Button
              variant={view === 'card' ? 'primary' : 'outline-primary'}
              onClick={() => setView('card')}
            >
              Card
            </Button>
          </ButtonGroup>
          <Button variant="success" onClick={() => navigate('/add')}>
            + Add Orchid
          </Button>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        view === 'table' ? (
          <OrchidTable orchids={orchids} onEdit={handleEdit} onDelete={handleAskDelete} />
        ) : (
          <OrchidCard orchids={orchids} onEdit={handleEdit} onDelete={handleAskDelete} />
        )
      )}

      <ConfirmModal
        show={deleteTarget !== null}
        onHide={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        orchidName={deleteTarget?.orchidName}
        loading={deleting}
      />
    </Container>
  )
}

export default HomePage
