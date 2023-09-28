import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import UserList from './UserList';

const NavBar = () => {
    const [route, setRoute] = useState("Login");
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <button onClick={()=>setRoute("Login")} className='navButton'>Login</button>
            <button onClick={()=>setRoute("Users")} className='navButton'>Users</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
        {route === "Login"?(<div className='LoginPage'><Login/></div>):(<div><UserList/></div>)}
    </div>
    </>
  )
}

export default NavBar
