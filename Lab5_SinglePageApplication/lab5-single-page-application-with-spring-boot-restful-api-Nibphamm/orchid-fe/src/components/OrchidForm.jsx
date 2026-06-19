import { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'

const EMPTY_FORM = {
  orchidName: '',
  orchidCategory: '',
  orchidDescription: '',
  orchidURL: '',
  isNatural: false,
  isAttractive: false,
}

function OrchidForm({ initialData, onSubmit, submitLabel = 'Save', loading = false }) {
  const [form, setForm] = useState(initialData ?? EMPTY_FORM)

  // Sync form when editing an existing orchid (required: load old data into form).
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ ...EMPTY_FORM, ...initialData })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="orchidName">
            <Form.Label>Orchid Name</Form.Label>
            <Form.Control
              type="text"
              name="orchidName"
              value={form.orchidName}
              onChange={handleChange}
              placeholder="Ví dụ: Phalaenopsis amabilis"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="orchidCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="orchidCategory"
              value={form.orchidCategory}
              onChange={handleChange}
              placeholder="Ví dụ: Phalaenopsis"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="orchidDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="orchidDescription"
          value={form.orchidDescription}
          onChange={handleChange}
          placeholder="Mô tả ngắn về loài lan này"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="orchidURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="orchidURL"
          value={form.orchidURL}
          onChange={handleChange}
          placeholder="https://..."
        />
        {form.orchidURL && (
          <div className="mt-2">
            <Image
              src={form.orchidURL}
              alt="Preview"
              thumbnail
              style={{ maxHeight: 160, objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </Form.Group>

      <Row className="mb-3">
        <Col xs="auto">
          <Form.Check
            type="switch"
            id="isNatural"
            name="isNatural"
            label="Natural"
            checked={form.isNatural}
            onChange={handleChange}
          />
        </Col>
        <Col xs="auto">
          <Form.Check
            type="switch"
            id="isAttractive"
            name="isAttractive"
            label="Attractive"
            checked={form.isAttractive}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Đang lưu...' : submitLabel}
      </Button>
    </Form>
  )
}

export default OrchidForm
