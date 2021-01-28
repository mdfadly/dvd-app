import React from 'react'
import {
    Button,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Link,
    NavLink,
    withRouter,
} from 'react-router-dom'
import {
    HomeRounded
} from '@material-ui/icons'
import './Header.css'

const Header = (props) => {
    const pathName = props ?.location ?.pathname;
    return (
        <Navbar expand="lg" sticky="top" className="header">
            <Nav.Link as={NavLink} to="/" className="header_navlink">
                <Navbar.Brand className="header_home">
                    <HomeRounded />
                </Navbar.Brand>
            </Nav.Link>

            <Navbar.Toggle />

            <Navbar.Collapse>
                <Nav>
                    <Nav.Link as={NavLink} to="/" className={pathName === '/' ? 'header_link_active' : 'header_link'}>
                        Actor
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/film" className={pathName === '/film' ? 'header_link_active' : 'header_link'}>
                        Film
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Header)
