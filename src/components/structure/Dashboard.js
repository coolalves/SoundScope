import React from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../config/firebase'
import { get } from '../authentication/Login'
import { useAuth } from '../../config/firebase'
import { useState, useEffect } from 'react'
import {userParam} from "../authentication/Signup"

export default function Dashboard() {
    
   
   // UserData(userInfo)
    

    //console.log(userData)
    //const [currentUserID, setCurrentUserID] = useState("")
    //console.log(currentUser.uid)
    const navigate = useNavigate()   

   /* useEffect(() =>{
        console.log(currentUser.uid)
    })*/

    return (
       <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Dashboard</h2>
                <h2 className="text-center mb-4">Welcome</h2>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3"> 
                    Update Profile
                </Link>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
            <Button onClick={async e => {e.preventDefault(); logout(); alert('Logged Out'); window.sessionStorage.clear(); navigate('/login')}} variant="link">
            Log Out
            </Button>
        </div>
       </>
    )
}
