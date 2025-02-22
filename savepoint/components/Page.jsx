import React, { useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';

const Page = (props) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        router.push(`/q=${searchTerm}`)
    }
    
    return (
        <>
            <Navbar bg="" data-bs-theme="dark" className='d-flex flex-wrap' style={{ backgroundColor: "#1956B4"}}>
                <Container className='d-flex flex-wrap align-items-center justify-content-center'>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/cropped-logo.jpg"
                            width="300"
                            height="100"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="navbar me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/experiences">Experiences</Nav.Link>
                        <Nav.Link href="/lists">Lists</Nav.Link>
                    </Nav>

                    <Form className='d-flex' onSubmit={handleSubmit}>
                        <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button variant='warning' type="submit" className='w-25'>
                            <MagnifyingGlassIcon className="size-2" />
                        </Button>
                    </Form>
                </Container>
            </Navbar>

            <Container className='contentContainer shadow my-3 bg-light p-5 rounded'>
                {props.children}
            </Container>
        </>
    )
}

export default Page