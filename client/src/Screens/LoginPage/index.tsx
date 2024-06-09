import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Input, Row } from 'reactstrap'
import UbuntuImage from "../../assets/images/ubuntu_orange_hex.svg";
import { auth } from '../../firebase'
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import isEmail from 'validator/lib/isEmail';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loginHandler = (e: any) => {
        e?.preventDefault();
        
        if(!isEmail(email)) {
            return toast.warning("Invalid email");
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error('Invalid Credentials');
            });
    }

    return (
        <div className="align-items-center bg-purple d-flex justify-content-center w-100">
            <Container className="login-page-container mx-0 bg-purple pt-5 justify-content-center align-items-center">
                <Row className="d-flex align-items-center">
                    <i className="ri-user-3-fill fa-5x text-white" />
                </Row>
                
                <Form>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="login-input-field"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <br />

                    <Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="login-input-field"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className="auth-link">
                        <Link to="/signup" className="auth-link mt-3" >
                            <span className="fa-sm">Don't have an account yet? <strong>Signup here</strong> </span>
                        </Link>
                    </div>

                    <br />

                    <Row className="d-flex justify-content-center w-100 login-button-row">
                        <Button 
                            className="cursor-pointer login-button  "
                            onClick={loginHandler}
                            type="submit"
                        >
                            <i 
                                className="ri-arrow-right-s-line fa-2x text-white p-1"
                            />
                        </Button>
                    </Row>
                </Form>


                <div className="auth-ubuntu mt-5 pt-5">
                    <img className="h-100 w-100 mt-1" src={UbuntuImage} alt="Ubutnu" />
                </div>
                
            </Container>

        </div>
    )
}

export default LoginPage
