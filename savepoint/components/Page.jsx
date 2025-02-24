import React, { useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';

const Page = (props) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        router.push(`/q=${searchTerm.toLocaleLowerCase()}`)
    }
    
    return (
        <>
            <header>
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
            </header>

            <main>
                <Container className='contentContainer shadow my-3 bg-light p-5 rounded'>
                    {props.children}
                </Container>
            </main>

            <footer className='container d-flex flex-wrap justify-content-between  w-100 border-top border-dark my-3 pt-2'>
                <p>Save Point is a template blog made with React.</p>
                <p>Copyright &copy; 2025</p>
            </footer>
        </>
    )
}

export default Page