import React, {useState} from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import {login, register} from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'


export function get(user = ""){
  return window.sessionStorage.getItem(user)
}

export function useVerify(x='')
{
  window.sessionStorage.getItem(x)
  
  if (window.sessionStorage.getItem(x) != null)
    return true
  else return false
}

export function useGetStorage(x='')
{
  return window.sessionStorage.getItem(x)
}

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [dados, setDados] = useState('')
    const UserParam = (i) => {
      setDados(i)
    }
    console.log(dados)
    return (
        <>
      <Card>
        <Card.Body>
          <Form>
          <h2 className="text-center mb-4">Welcome</h2>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"  value={email} onChange={(e) => {setEmail(e.target.value.trim())}} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  value={password} onChange={(e) => {setPassword(e.target.value)}} required />
            </Form.Group>
            <Button 
            onClick={async e => {
              e.preventDefault()
              await login(email, password)
                  .then ((response) => {alert('Successfully Logged In'); UserParam(response.user.uid); navigate('/dashboard/');})
                  .catch((error) => alert(error.message))
          }}
            className="w-100 mt-3 mb-3" type="submit">
              Log In
            </Button>
            <Button 
            onClick={async e => {
              e.preventDefault()
                   await register(email, password)
                  .then(async (response) => {alert('Successfully Registered'); UserParam(response.user.uid); navigate('/add-user/')})
                  .catch((error) => alert(error.message))
          }}
            className="w-100 " type="submit">
              Register
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
     
    </>
    )
}
