import { useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { EmojiSmile } from "react-bootstrap-icons";

import "./XLogin.css"

function XLogin(props) {
    const [loginEnabled, setLoginEnabled] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();

    const onEmailChange = (ev) => {
        setEmail(ev.target.value)

        if (ev.target.value !== "" && password !== "") 
            setLoginEnabled(true)
        else setLoginEnabled(false)
    }

    const onPasswordChange = (ev) => {
        setPassword(ev.target.value)

        if (email !== "" && ev.target.value !== "") 
            setLoginEnabled(true)
        else setLoginEnabled(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.doLogin({ email, password }).catch(err => setError(err)); 
    }

    return (
        <Container fluid className="bg-dark v-100 align-items-center justify-content-center">
            <Row className="justify-content-center vh-100">
                <Col xs="12" sm="8" md="6" lg="4" xl="3" className="my-auto">
                    <Form className="text-center" >
                        <h2  className="text-light">Meme Generator</h2>
                        <EmojiSmile className="my-3 icon" alt="" width="96" height="96"/>
                        <h4 className="text-light py-2">Login</h4>
                        { error && <Alert variant="danger">{error}</Alert> }
                        <Form.Control type="email" value={email} className="input-top form-control" placeholder="Email address" onChange={(ev) => onEmailChange(ev)} />
                        <Form.Control type="password" value={password} className="input-bottom form-control" placeholder="Password" onChange={(ev) => onPasswordChange(ev)} />
                        <Button className="btn-lg btn-block mt-4" disabled={loginEnabled ? "" : "disabled"} onClick={handleSubmit}>Log in</Button>
                        <p className="mt-5 mb-3 text-muted">© 2021</p>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default XLogin