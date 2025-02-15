import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/auth"
export const PrivateRoutes = () => {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" />
}
