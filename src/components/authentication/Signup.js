import React, {useState} from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import {register, colRef} from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'

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
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const [dados, setDados] = useState('')
    const UserParam = (i) => {
      setDados(i)
    }
    console.log(dados)

    const createUserProfile = async () =>{
        await addDoc(colRef, 
          {
            username: username,
            email: email,
          })
      }

    return (
        <>
      <Card>
        <Card.Body>
          <Form>
          <h2 className="text-center mb-4">Welcome</h2>
          <Form.Group id="username">
              <Form.Label>username</Form.Label>
              <Form.Control type="username"  value={username} onChange={(e) => {setUsername(e.target.value.trim())}} required />
            </Form.Group>
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
                   await register(email, password)
                  .then(async (response) => {alert('Successfully Registered'); UserParam(response.user.uid); createUserProfile(); navigate('/dashboard/')})
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
