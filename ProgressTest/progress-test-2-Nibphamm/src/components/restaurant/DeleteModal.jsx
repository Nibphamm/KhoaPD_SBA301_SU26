import { Modal, Button } from 'react-bootstrap'

function DeleteModal({ show, restaurant, onConfirm, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {restaurant && (
          <p>
            Are you sure you want to delete the restaurant &quot;
            <strong>{restaurant.name}</strong>&quot;?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Yes</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
