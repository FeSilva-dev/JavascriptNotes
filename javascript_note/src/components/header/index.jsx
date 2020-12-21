import React, { useState } from 'react'
import { Navbar, Container, Column } from 'rbx'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/images/logo.png'
import '../../styles/header.scss'

const Header = () => {

    const [openMenu, setOpenMenu] = useState(false);

    return(
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <img alt="Logo" src={logoImage}/>
                        </Link>
                        <Navbar.Burger 
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false" 
                        data-target="navbar-menu" >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Navbar.Burger>
                    </Navbar.Brand>

                    <Navbar.Menu active={openMenu.toString()}
                        onClick={() => setOpenMenu(!openMenu)} id="navbar-menu">
                        <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
                            <Column.Group>
                                <Column>
                                    <Link to="/register" className="button is-white has-text-custom-purple">Register</Link>
                                </Column>
                                <Column>
                                    <Link to="/login" className="button is-outlined is-custom-purple">Login</Link>
                                </Column>
                            </Column.Group>
                        </Navbar.Segment>
                    </Navbar.Menu>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header