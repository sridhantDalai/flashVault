import { useEffect } from 'react'
import "./load.scss"
import { useNavigate, useLocation } from 'react-router-dom'

const LoadTemp = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const type = location.state?.type

  useEffect(() => {

    if (type === "login") {
      sessionStorage.setItem("loggedIn", true)
    } else {
      sessionStorage.removeItem("loggedIn")
    }

    const timer = setTimeout(() => {
      if (type === "login") {
        navigate("/dashboardTemp", { replace: true })
      } else {
        navigate("/env", { replace: true })
      }
    }, 3000)

    return () => clearTimeout(timer)

  }, [type, navigate])

  return (
    <div>
      <h1>
        {type === "login"
          ? "Creating Temporary Environment ..."
          : "Oops Time Out !"}
      </h1>
    </div>
  )
}

export default LoadTemp