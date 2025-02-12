import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Page = (props) => {
    return (
        <>
            <Navbar bg="" data-bs-theme="dark" style={{ backgroundColor: "#1956B4"}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/cropped-logo.jpg"
                            width="300"
                            height="100"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className='mt-3'>
                {props.children}
            </Container>
        </>
    )
}

export default Page