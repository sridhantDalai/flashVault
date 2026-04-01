import { Navigate } from "react-router-dom"


export const ProtectedRoute = ({children}) => {
    // const user = localStorage.getItem("user")
    // if (!user){
    //   return <Navigate to={"/"} />
    // }
    return children
}

export const ProtectedRouteTemp = ({children}) => {
    const logIN = sessionStorage.getItem("loggedIn")
    if (logIN == null){
      return <Navigate to={"/env"} />
    }  
    return children  
}
