import { useState, useEffect } from 'react'

const useDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    setTasks(savedTasks)
  }, [])

  return { isSidebarOpen, setSidebarOpen, tasks }
}

export default useDashboard