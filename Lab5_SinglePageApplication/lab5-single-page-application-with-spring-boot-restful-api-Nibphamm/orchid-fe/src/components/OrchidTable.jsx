import { Table, Button, Badge, Image } from 'react-bootstrap'

function OrchidTable({ orchids, onEdit, onDelete }) {
  if (!orchids || orchids.length === 0) {
    return <p className="text-center text-muted my-4">Chưa có orchid nào trong danh sách.</p>
  }

  const hideBrokenImage = (e) => {
    e.target.style.display = 'none'
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Natural</th>
          <th>Attractive</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orchids.map((o, index) => (
          <tr key={o.orchidId}>
            <td>{index + 1}</td>
            <td>
              {o.orchidURL ? (
                <Image
                  src={o.orchidURL}
                  alt={o.orchidName}
                  thumbnail
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                  onError={hideBrokenImage}
                />
              ) : (
                <span className="text-muted">—</span>
              )}
            </td>
            <td>{o.orchidName}</td>
            <td>{o.orchidCategory}</td>
            <td>
              {o.isNatural ? (
                <Badge bg="success">Natural</Badge>
              ) : (
                <Badge bg="secondary">Hybrid</Badge>
              )}
            </td>
            <td>
              {o.isAttractive ? (
                <Badge bg="warning">Attractive</Badge>
              ) : (
                <Badge bg="light" text="dark">Normal</Badge>
              )}
            </td>
            <td>{o.orchidDescription}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => onEdit(o.orchidId)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(o.orchidId)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default OrchidTable
