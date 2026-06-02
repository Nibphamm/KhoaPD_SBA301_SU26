import React, { useState } from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { OrchidsData } from '../data/ListOfOrchids'
import Model from './Model'
export default function Orchids() {
    const [show, setShow] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (orchid) => {
        setSelectedOrchid(orchid);
        setShow(true);
    }
    return (
        <Container className="my-5">
            <Row className="g-4">
                {OrchidsData.map((orchid) => (
                    <Col md={3} key={orchid.id} className="d-flex">
                        <Card className="h-100 w-100 d-flex flex-column shadow-sm border-0">
                            <Card.Img 
                                variant="top" 
                                src={orchid.image} 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <Card.Body className="d-flex flex-column flex-grow-1">
                                <Card.Title className="fs-5 fw-bold">{orchid.orchidName}</Card.Title>
                                <Card.Text className="text-muted flex-grow-1">
                                    {orchid.category}
                                </Card.Text>
                                <Button variant="primary" className="mt-auto w-100" onClick={() => handleShow(orchid)}>
                                    Detail
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Model show={show} handleClose={handleClose} selectedOrchid={selectedOrchid} />
        </Container>
    )
}
