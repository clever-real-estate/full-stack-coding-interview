import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Photos from './components/Photos';
import client from './apiClient';


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get('/user')
    .then(function(res) {
      setCurrentUser(true);
      setUsername(res.data.user.username);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById('form_btn').innerHTML = 'Register';
      setRegistrationToggle(false);
    } else {
      document.getElementById('form_btn').innerHTML = 'Log in';
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      '/register',
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        '/login',
        {
          email: email,
          password: password
        }
      ).then(function(res) {
          setCurrentUser(true);
        }).catch(function(error) {
            alert('Failed to log in after registration: ' + error.response.data.message);
        });
    }).catch(function(error) {
        alert('Failed to register: ' + error.response.data.message);
    });
}

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      '/login',
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    }).catch(function(error) {
        alert('Failed to log in.');
    });
}

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      '/logout',
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img src={logo} height="50px" width="50px" />
            </Navbar.Brand>
            <Navbar.Text>All {username}'s Photos</Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <Photos />
        </div>
      </div>
    );
  }
  return (
    <div>
    <Navbar>
      <Container>
        <Navbar.Brand className="brand">
          <img src={logo} height="50px" width="50px" />
        </Navbar.Brand>
        <Navbar.Brand>Photo Library</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;