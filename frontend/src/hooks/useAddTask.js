import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const useAddTask = () => {
  const [task, setTask] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    teacher: '',
    priority: 'Medium',
    status: 'Pending',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!task.title || !task.subject || !task.dueDate) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' })
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(task.dueDate)
    due.setHours(0, 0, 0, 0)

    if (due < today) {
      setMessage({ type: 'error', text: 'Due date must be today or in the future.' })
      return
    }

    setLoading(true)
    setMessage(null)

    // ✅ Save to localStorage
    try {
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || []

      const newTask = {
        ...task,
        id: Date.now(),
        completed: false,
      }

      localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]))

      setMessage({ type: 'success', text: 'Task added successfully!' })

      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err) {


      setMessage({ type: 'error', text: 'Failed to save task locally.' })
    } finally {
      setLoading(false)
    }
  }

  return {
    task,
    setTask,
    loading,
    message,
    handleChange,
    handleSubmit,
    setLoading,
  }
}

export default useAddTask