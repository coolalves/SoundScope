import React, { Component } from 'react';
import { auth, createUserDocument } from '../../config/firebase';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

class Signup extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocument(user, { displayName });
    } catch (error) {
      console.log('error', error);
    }

    this.setState({ displayName: '', email: '', password: '' });
  };

  render() {
    const { displayName, email, password } = this.state;
    return (
      <>
        <Card>
        <Card.Body> 
        <h2 className="text-center mb-4">Signup</h2>
        
            <Form className="signup-login" onSubmit={this.handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="name"
                  name="displayName"
                  value={displayName}
                  onChange={this.handleChange}
                  placeholder="" required/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="" required />

            </Form.Group>
          
            <Button className="w-100" type="submit">Signup</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Login</Link>
        </div>
      </>
    );
  }
}

export default Signup;