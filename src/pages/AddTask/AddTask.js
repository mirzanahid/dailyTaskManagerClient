import React, { useContext, useState } from 'react';
import { Container, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import './AddTask.css'

const AddTask = () => {
    const imageHostKey = process.env.REACT_APP_img_key;
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handlerForAddTask = (e) => {

        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const image_url = form.image_url.value;
        const user_email = user?.email
        const image = form.imageFile
        console.log("image",image)
        const formData = new FormData();
        formData.append('image', image);


        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                 console.log("image upload done")
                }
            })

        const addTask = {
            title: title,
            image_url: image_url,
            description: description,
            email: user_email
        }
        console.log(addTask);

        // fetch('http://localhost:5000/addTask', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': "application/json"
        //     },
        //     body: JSON.stringify(addTask)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.acknowledged) {
        //             console.log(data)
        //             toast.success("Product added successfully.")
              
        //         }
        //     })
        //     .catch(error => console.error(error));

    }



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
                <Form onSubmit={handlerForAddTask} className='addTaskForm'>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task Title" name="title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter Task Description"
                            style={{ height: '100px' }}
                            name="description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control type="file" placeholder="Add Task Image" name='image_url' />
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