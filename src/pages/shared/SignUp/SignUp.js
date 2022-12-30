import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import googleicon from '../../../assets/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import app from '../../../firebase/firebase.config';
import './SignUp.css';


const auth = getAuth(app)
// google provider
const provider = new GoogleAuthProvider();

const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const { register, formState: { errors }, watch, handleSubmit } = useForm();
    const [signUpError, setSignUpError] = useState('');


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    // location state
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSignIn = data => {
        setLoading(true)
        setSignUpError('')
        // create new user 
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;

                console.log(user)
                navigate(from, { replace: true })
            })

            .catch(error => {
                console.error(error)
                if (error.message) {
                    setSignUpError('This email already in used please try another. ')
                }
            })
    };

    // log in with google 
    const handlerForGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error('error', error)
            })
    };

    return (
        <div className='furnitureMart-form'>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col lg='6'>
                        <div className="signup-login-form">
                            <Form onSubmit={handleSubmit(handleSignIn)} >
                                <h2 className='signup-heading'>Sign Up</h2>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" {...register("name", { required: "this field is required" })} placeholder="Enter Name" />
                                    {errors.name && <p className='error-text' role="alert">{errors.name?.message}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" {...register("email", { required: "this field is required" })} placeholder="Enter Email" />
                                    {errors.email && <p className='error-text' role="alert">{errors.email?.message}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" {...register("password", { required: "this field is required" })} placeholder="Enter Password" />
                                    {errors.password && <p className='error-text' role="alert">{errors.password?.message}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" {...register("confirmPassword", {
                                        required: "this field is required", validate: data => {
                                            if (watch('password') !== data) {
                                                return 'password and confirm password not matched'
                                            }

                                        }
                                    })} placeholder="Enter Confirm Password" />
                                    {
                                        errors.confirmPassword && <p className='error-text' role="alert">{errors.confirmPassword?.message}</p>

                                    }
                                </Form.Group>
                                <p className='error-text' role="alert">{signUpError}</p>
                                <input className='submit-btn' value={loading ? 'Sign UP...' : 'Sign Up'} type="submit" />
                                <p className='signUp-foot mt-3'>Already have an account? <Link className='form-footer-link' to={'/login'}>Log in</Link></p>
                                <p className='or'>Or</p>
                            </Form>
                            <div className="button-group">

                                <button className='social-signup' onClick={handlerForGoogleSignin}><img className='google-icon' src={googleicon} alt="google icon" /> Continue with Google</button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUp;