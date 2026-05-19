import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function OrchidModel({ show, handleClose, selectedOrchid }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">{selectedOrchid ? selectedOrchid.orchidName : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOrchid ? (
                    <div>
                        <img 
                            src={selectedOrchid.image} 
                            alt={selectedOrchid.orchidName} 
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', objectFit: 'cover', maxHeight: '300px' }} 
                        />
                        <p className="text-muted">{selectedOrchid.description}</p>
                    </div>
                ) : (
                    <p>Loading details...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
