import React, { useContext, useState } from 'react';
import { Container, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import './AddTask.css'

const AddTask = () => {
    const imageHostKey = process.env.REACT_APP_img_key;
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handlerForAddTask = data => {
        setLoading(true)
        const title = data.title.value;
        const description = data.description.value;
        const user_email = user?.email
        const image = data.imageFile[0]
        console.log(image)
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
                    const addTask = {
                        title: data.title,
                        description: data.description,
                        email: user_email,
                        image: imgData.data.url,
                        status: "uncompleted",
                        time: new Date()
                    }
                    fetch('https://daily-task-manager-server-mirzanahid.vercel.app/addTask', {
                        method: 'POST',
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify(addTask)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                console.log(data)
                                toast.success("Product added successfully.")
                                setLoading(false)
                                handleClose()
                            }
                        })
                        .catch(error => console.error(error));

                }
            })




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
                    <Form onSubmit={handleSubmit(handlerForAddTask)} className='addTaskForm'>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" {...register("title", { required: "this field is required" })}
                                placeholder="Enter Task Title" name='title' />
                            {errors.title && <p className='error-text' role="alert">{errors.title?.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Task Description"
                                style={{ height: '100px' }}
                                name="description"
                                {...register("description", { required: "this field is required" })}
                            />
                            {errors.description && <p className='error-text' role="alert">{errors.description?.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Add Image</Form.Label>
                            <Form.Control type="file" {...register("imageFile")}
                                placeholder="Add Task Image" />
                        </Form.Group>
                        <button className='submit-btn' type="submit">
                            {loading ? 'Submit...' : 'Submit'}
                        </button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default AddTask;