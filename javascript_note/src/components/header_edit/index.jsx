import React, { useState } from 'react'
import { Navbar, Container, Column, Button, Dropdown } from 'rbx'
import logoImage from '../../assets/images/logo-white.png'
import '../../styles/header.scss'
import { Redirect, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UsersServices from '../../services/users'

function HeaderEdit() {
    const [redirectToHome, setRedirectToHome] = useState(false);

    const userInformation = JSON.parse(localStorage.getItem('user'))
  
    const logOut = async () => {
      await UsersServices.logout();
      setRedirectToHome(true);
    }
  
    if (redirectToHome == true)
      return <Redirect to={{ pathname: "/" }} />
  
    return (
      <Navbar color="custom-purple" className="navbar-logged">
        <Navbar.Brand>
          <Column.Group>
            <Column size="11" offset="1">
              <Link to="/notes">
                <img src={logoImage} />
              </Link>
            </Column>
          </Column.Group>
            <Navbar.Burger
                className="navbar-burger burger" 
                aria-label="menu" 
                aria-expanded="false" 
                data-target="navbar-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </Navbar.Burger>
        </Navbar.Brand>
  
        <Navbar.Menu>
          <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
            <Navbar.Item as="div">
              <Dropdown>
                <Dropdown.Trigger>
                  <Button className="button" color="white" outlined>
                    <span>{userInformation.name} ▼</span>
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Content>
                    <Dropdown.Item as="div">
                      <Link to="/notes">Notes</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="div">
                      <a href="#" onClick={e => logOut()}>LogOut</a>
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>
    )
  }
  
  export default HeaderEdit;