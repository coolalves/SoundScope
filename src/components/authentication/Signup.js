import React, {useState} from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import {register, colRef} from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'

export function UseStorage(x='', y='')
{
    window.sessionStorage.setItem(x, y)
}

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
    //console.log(dados)

       

    return (
        <>
      <Card>
        <Card.Body >
          <Form>
          <h2 className="text-center mb-4">Register</h2>
          <div className="text-center mb-4">
          </div>  
          <Form.Group id="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="username"  value={username} onChange={(e) => {setUsername(e.target.value.trim())}} required />
            </Form.Group>
            <Form.Group className="mt-4" id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email"  value={email} onChange={(e) => {setEmail(e.target.value.trim())}} required />
            </Form.Group>
            <Form.Group className="mt-4" id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password"  value={password} onChange={(e) => {setPassword(e.target.value)}} required />
            </Form.Group>
            <Button 
            onClick={async e => {
              e.preventDefault()
                   await register(email, password)
                  .then(async (response) => {alert('Successfully Registered'); 
                  UserParam(response.user.uid); 
                  addDoc(colRef,
                    {
                        uid:response.user.uid,
                        username: username,
                        email: email
                    });
                  UseStorage('username', response.user.displayName);
                  UseStorage('useremail', response.user.email);  
                  UseStorage('id', response.user.uid);
                  navigate('/dashboard/')})
                  .catch((error) => alert(error.message))
          }}
            className="w-100 mt-4" type="submit">
              Register
            </Button>
            
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
     
    </>
    )
}
