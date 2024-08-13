import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Users.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Pie } from 'react-chartjs-2';
import { Chart as Chartjs, ArcElement, Legend, Tooltip } from 'chart.js'

function Users({ users, setUsers, newName, setNewName, newEmail, setNewEmail, newWebsite, setNewWebsite, handleSubmit, addUser, handleDelete, count, setCount }) {
  Chartjs.register(ArcElement, Legend, Tooltip)

  const data = {
    labels: ['Active Users','Non Active Users'],
    datasets: [{
      data: [count, users.length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }]
  };


  return (
    <div>
      <h4 className='text-center'>Users Data Management System:</h4>
      <Row className='p-4'>
        <Col lg={6}>
          <div className="usersBox">
            <p>Total Active Users: {count}</p>
          </div>
        </Col>

        <Col lg={6}>
          <div className="chartSize">
            <Pie data={data} />
          </div>
        </Col>

      </Row>
      <div className='px-4'>
        <Row>
          <Col lg={12}>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center pt-3">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Website</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((i) => (
                    <tr key={i.id} className='text-center'>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td>{i.email}</td>
                      <td>{i.website}</td>
                      <td><Button variant="danger" onClick={() => handleDelete(i.id)}>Delete</Button></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>

        </Row>
        {/* Form Data: */}
        <Form className="ps-5 pb-3" onSubmit={handleSubmit}>
          <Row>
            <Col lg={3}>
              <Form.Label htmlFor="name" className='label'>Name</Form.Label>
              <Form.Control
                type="text"
                className="pb-3"
                id="name"
                aria-describedby="name"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Col>
            <Col lg={3}>
              <Form.Label htmlFor="email" className='label'>Email</Form.Label>
              <Form.Control
                type="text"
                id="email"
                className="pb-3"
                aria-describedby="email"
                placeholder="Enter Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Col>
            <Col lg={3}>
              <Form.Label htmlFor="website" className='label'>Website</Form.Label>
              <Form.Control
                type="text"
                id="website"
                className="pb-3"
                aria-describedby="website"
                placeholder="Enter Website"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </Col>
            <Col lg={3}>
              <Button variant="primary" type="submit" onClick={addUser}>ADD User</Button>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  )
}

export default Users