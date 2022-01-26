/*import React, {useEffect, useState} from 'react'
import {useAuth} from '../authentication/AuthContext'
import {uploadFiles}  from '../../config/firebase'

export default function ProfilePicture() {
  //const  currentUser = useAuth()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  //const [photoURL, setPhotoURL] = useState()
  
  
  function handleChange(e){
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

  function handleClick(){
      uploadFiles(photo, setLoading)
    }

   

    
  return (
    <>
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="Avatar" className='avatar'/> 
    </>
    )
}
*/