import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout, colRef, useAuth, upload } from '../../config/firebase'
import { onSnapshot, query, where, docs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { updateProfile } from 'firebase/auth';

export default function Dashboard() {
    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const email = window.sessionStorage.getItem("useremail")
    const uid = window.sessionStorage.getItem("id")
    const loggedname = window.sessionStorage.getItem("username")
    const navigate = useNavigate()  
    const q = query(colRef, where("uid", "==", uid))
    const [photoURL, setPhotoURL] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    const [photo, setPhoto] = useState(null)
    const [registered, setRegistered] = useState(false)
    const currentUser = useAuth()
    console.log(currentUser)
    
    async function getUserData(){
       setLoading(true)
       onSnapshot(q, (snapshot) =>{
        let userdata = []
            snapshot.docs.forEach((doc) =>{
            userdata.push({...doc.data(), id: doc.id})
        })
        try{
            setName(userdata[0].username)
            updateProfile(currentUser, {displayName: name})
            setRegistered(true)
            setLoading(false)
        }catch{
            setRegistered(false)
            console.log(userdata)
            setName(loggedname)
            setLoading(false)
        }        
    })
   }
    
   function handleChange(e){
       if (e.target.files[0]){
           setPhoto(e.target.files[0])
       }
    } 

   function handleClick(){
       upload(photo, currentUser, setLoading)
   }
    
    
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
                <h2 className="text-center mb-4">Welcome, {name} !</h2>
                <p className="text-center mb-4">{email}</p>
                <p className="text-center mb-4">{uid}</p>

                <div className="text-center w-100 text-center mt-3">
                <img  style={{borderRadius: 200, width:65}} src={photoURL} alt="Avatar" className='avatar'/>
                <input type="file" className="text-center mt-2 mb-3" onChange={handleChange} />
                <Button disabled={loading || !photo} onClick={handleClick}> Upload Picture </Button>
                </div>
               
            <div className="w-100 text-center mt-2">
            <Button onClick={async e => {e.preventDefault(); logout(); alert('Logged Out'); window.sessionStorage.clear(); navigate('/login')}}>
            Log Out
            </Button>
            </div>
            </Card.Body>
        </Card>
        
       </>
    )
}
