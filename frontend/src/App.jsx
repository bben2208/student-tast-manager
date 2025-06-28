import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddTask from "./pages/AddTask" // ✅ import the new page
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"

const Dashboard = lazy(() => import("./pages/Dashboard"))

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <Dashboard />
            // </PrivateRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            // <PrivateRoute>
            <AddTask />
            // </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
