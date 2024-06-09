import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Input, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import UbuntuImage from "../../assets/images/ubuntu_orange_hex.svg";
import isEmail from 'validator/es/lib/isEmail';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase'

const SignupPage = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    // const history = useHistory();

    const signupHandler = (e: any) => {
        e?.preventDefault();

        if(!isEmail(email)) {
            return toast.warning("Invalid Email");
        }

        if(password.length < 6) {
            return toast.warn("Password should be minimum 6 characters");
        }

        if(!name.length) {
            return toast.warn("Enter non empty name");
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            updateProfile(user, { displayName: name });

            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
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
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="login-input-field"
                        onChange={e => setName(e.target.value)}
                    />

                    <br />
                    
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="login-input-field"
                        onChange={e => setEmail(e.target.value.trim())}
                    />

                    <br />

                    <Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="login-input-field"
                        onChange={e => setPassword(e.target.value.trim())}
                    />

                    <div className="auth-link">
                        <Link to="/login" className="auth-link mt-3" >
                            <span className="fa-sm">Already have an accout? <strong>Login here</strong></span>
                        </Link>
                    </div>

                    <br />

                    <Row className="d-flex justify-content-center w-100 login-button-row">
                        <Button 
                            className="cursor-pointer login-button  "
                            onClick={signupHandler}
                            type="submit"
                        >
                            <i 
                                className="ri-arrow-right-s-line fa-2x text-white p-1"
                            />
                        </Button>
                    </Row>
                </Form>

                <div className="auth-ubuntu">
                    <img className="h-100 w-100" alt="Ubuntu" src={UbuntuImage} />
                </div>

            </Container>

        </div>
    )
}

export default SignupPage
