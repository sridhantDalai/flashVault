import {useEffect} from 'react'
import "./load.scss"
import { useNavigate } from 'react-router-dom'
import { show } from '../backend/components.js'

const Load = () => {
  const navigate = useNavigate()
    useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://flashvault-production.up.railway.app/me", {
        credentials : "include"
      })

      if(!res.ok){return navigate("/")}

      const data = await res.json()
      show(data)
      localStorage.setItem("user",JSON.stringify(data.user))

      navigate("/key")
    }

    fetchUser()
  }, [])
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

export default Load
