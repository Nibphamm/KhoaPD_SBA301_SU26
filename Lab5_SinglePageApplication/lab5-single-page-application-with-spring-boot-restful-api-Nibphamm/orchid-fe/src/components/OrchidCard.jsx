import { Card, Button, Badge, Row, Col } from 'react-bootstrap'

function OrchidCard({ orchids, onEdit, onDelete }) {
  if (!orchids || orchids.length === 0) {
    return <p className="text-center text-muted my-4">Chưa có orchid nào trong danh sách.</p>
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {orchids.map((o) => (
        <Col key={o.orchidId}>
          <Card className="h-100 shadow-sm">
            {o.orchidURL && (
              <Card.Img
                variant="top"
                src={o.orchidURL}
                alt={o.orchidName}
                style={{ height: 180, objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}
            <Card.Body className="d-flex flex-column">
              <Card.Title>{o.orchidName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{o.orchidCategory}</Card.Subtitle>
              <div className="mb-2">
                {o.isNatural ? (
                  <Badge bg="success" className="me-1">Natural</Badge>
                ) : (
                  <Badge bg="secondary" className="me-1">Hybrid</Badge>
                )}
                {o.isAttractive ? (
                  <Badge bg="warning">Attractive</Badge>
                ) : (
                  <Badge bg="light" text="dark">Normal</Badge>
                )}
              </div>
              <Card.Text className="flex-grow-1">{o.orchidDescription}</Card.Text>
              <div className="d-flex gap-2 mt-2">
                <Button
                  variant="outline-primary"
                  size="sm"
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default OrchidCard
