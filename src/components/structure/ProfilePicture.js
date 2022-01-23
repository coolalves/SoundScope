import React, {useEffect, useState} from 'react'
import {useAuth} from '../authentication/AuthContext'
import upload  from '../../config/firebase'

export default function ProfilePicture() {
  const  currentUser = useAuth()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  
  
  function handleChange(e){
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

  function handleClick(){
        upload(photo, currentUser, setLoading)
    }

   useEffect(()=>{
    if (currentUser && currentUser.photoURL){
        setPhotoURL(currentUser.photoURL)
    }    
    

   }, [currentUser])  

    
  return (
    <>
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="Avatar" className='avatar'/> 
    </>
    )
}
