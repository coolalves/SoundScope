import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout, colRef, useAuth } from '../../config/firebase'
import { onSnapshot, query, where, docs } from 'firebase/firestore'
import { useState, useEffect } from 'react'



export default function Dashboard() {
    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const email = window.sessionStorage.getItem("useremail")
    const uid = window.sessionStorage.getItem("id")
    const navigate = useNavigate()  
    const q = query(colRef, where("uid", "==", uid))
    const [photoURL, setPhotoURL] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    
    function getUserData(){
       setLoading(true)
       onSnapshot(q, (snapshot) =>{
        let userdata = []
            snapshot.docs.forEach((doc) =>{
            userdata.push({...doc.data(), id: doc.id})
        }) 
        setName(userdata[0].username)
        setLoading(false)
    })
   }

    const currentUser = useAuth("")
    
    useEffect(() => {
        if(currentUser && currentUser.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
    } ,[currentUser])

    useEffect(() => {
        getUserData()
    },[])

    if(loading){
        return <h1>loading...</h1>
    }

    
     
    return (
       <>
        <Card>
            <Card.Body>
                <h1 className="text-center mb-4">Dashboard</h1>
                <h2 className="text-center mb-4">Welcome, {name}!</h2>
                <div className="text-center">
                <img  style={{borderRadius: 200, width:65}} src={photoURL} alt="Avatar" className='avatar'/>
                </div>
                <p className="text-center mb-4">{email}</p>
                <p className="text-center mb-4">{uid}</p>

            <div className="w-100 text-center mt-3">
            <Link to="/profile-picture">Update profile picture</Link>
            <Button onClick={async e => {e.preventDefault(); logout(); alert('Logged Out'); window.sessionStorage.clear(); navigate('/login')}} variant="link">
            Log Out
            </Button>
            </div>
            </Card.Body>
        </Card>
        
       </>
    )
}
