import React from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Login({ username, setUsername, pwd, setPwd, handleLoginSubmit }) {
  return (
    <div className='loginBody'>
      <div className='loginContainer'>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Label htmlFor="username">UserName</Form.Label>
          <Form.Control
            type="text"
            id="username"
            aria-describedby="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Form.Label htmlFor="pwd" className='pt-4'>Password</Form.Label>
          <Form.Control
            type="password"
            id="pwd"
            aria-describedby="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <div className="d-grid gap-2 py-4">
            <Button variant="outline-success" size="md" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login