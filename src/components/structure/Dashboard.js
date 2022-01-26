import React from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout, colRef } from '../../config/firebase'
import { get } from '../authentication/Login'
import {userParam} from "../authentication/Signup"
import { onSnapshot, query, where, docs } from 'firebase/firestore'
import { useState, useEffect } from 'react'



export default function Dashboard() {
    
    //const [error, setError] = useState(null) 
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const email = window.sessionStorage.getItem("useremail")
    const uid = window.sessionStorage.getItem("id")
    const navigate = useNavigate()  
   //console.log(uid)
    const q = query(colRef, where("uid", "==", uid))

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
                <p className="text-center mb-4">{email}</p>
                <p className="text-center mb-4">{uid}</p>
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
