import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import googleicon from '../../../assets/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import app from '../../../firebase/firebase.config';

const auth = getAuth(app)
// google provider
const provider = new GoogleAuthProvider();

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // location state
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleForLogin = data => {
        setLoading(true)
        setLoginError('')
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error.message);
                if (error.message) {
                    setLoginError('your email and password is incorrect');
                }

            })
    }

    //log in with google 
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
    }

    return (
        <div>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col lg='6'>
                        <div className="signup-login-form">
                            <Form onSubmit={handleSubmit(handleForLogin)} >
                                <h2 className='signup-heading'>Log In</h2>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" {...register("email", { required: "this field is required" })} placeholder="Enter Email" />
                                </Form.Group>
                                {errors.email && <p className='error-text' role="alert">{errors.email?.message}</p>}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" {...register("password", { required: "this field is required" })} placeholder="Enter Password" />
                                </Form.Group>
                                {errors.password && <p className='error-text' role="alert">{errors.password?.message}</p>}
                                <p className='error-text' role="alert">{loginError}</p>

                                <input className='submit-btn' value={loading ? 'Log In...' : 'Log In'} type="submit" />
                                <p className='signUp-foot mt-3'>New to Furniture Mart?? <Link className='form-footer-link' to={'/signup'}>Sign Up</Link></p>
                                <p className='or'>Or</p>

                            </Form>
                            <div className="button-group">

                                <button className='social-signup' onClick={handlerForGoogleSignin}><img className='google-icon' src={googleicon} alt="" /> Continue with Google</button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;