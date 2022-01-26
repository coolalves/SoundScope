import { useAuth, colRef } from '../../config/firebase'
import { addDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

export default function AddUser() {
  const currentUser = useAuth()
  /*const [username, setUsername] = useState("")*/
  const navigate = useNavigate()
  
 
    
  return (
    <>
    <Card>
      <Card.Body>
        <Form>
        <h2 className="text-center mb-4">Set your username</h2>
          <Form.Group id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control  required />
          </Form.Group>
          <Button onClick={ navigate('/dashboard/')} className="w-100 mt-3 " type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
    
  </>
  )
}
