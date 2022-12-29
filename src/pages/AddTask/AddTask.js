import React, { useState } from 'react';
import { Container, FloatingLabel, Button, Modal, Form } from 'react-bootstrap';
import './AddTask.css'

const AddTask = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='addTask'>
            <Container>
                <button className='addTask-btn' onClick={handleShow}>Add Task</button>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='addTaskForm'>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Task Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Task Description"
                                style={{ height: '100px' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Add Image</Form.Label>
                            <Form.Control type="file" placeholder="Add Task Image" />
                        </Form.Group>
                        <button className='submit-btn' type="submit">
                            Submit
                        </button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default AddTask;