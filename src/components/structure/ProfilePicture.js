import React from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout, colRef, useAuth } from '../../config/firebase'
import { get } from '../authentication/Login'
import {userParam} from "../authentication/Signup"
import { onSnapshot, query, where, docs } from 'firebase/firestore'
import { useState, useEffect } from 'react'



export default function Dashboard() {
    
    const navigate = useNavigate()  
    const [photoURL, setPhotoURL] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    const currentUser = useAuth("")
    
    useEffect(() => {
        if(currentUser && currentUser.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
    } ,[currentUser])


    function handleChange(){

    } 

   
     
    return (
       <>
        <Card>
            <Card.Body>
                
                <div className="text-center">
                <img  style={{borderRadius: 200, width:65}} src={photoURL} alt="Avatar" className='avatar'/>
                <input type="file" className="text-center mt-2 mb-3" onChange={handleChange} />
                </div>
                <Button onClick={async e => {e.preventDefault(); logout(); alert('Logged Out'); window.sessionStorage.clear(); navigate('/login')}} variant="link">
                  Upload Photo
                </Button>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
            <Button onClick={navigate('/login')} variant="link">
              Cancel
            </Button>
        </div>
       </>
    )
}
