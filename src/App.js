/* Dependencies */
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

/* App */
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  /* Display Tasks */
  useEffect(() => {
    /* Define fetched tasks */
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    /* Return tasks fetched from the server */
    getTasks()
  }, [])

  /* Fetch Tasks from Server */
  /* All */
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  /* One */
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  /* Task - Add */
  const addTask = async (task) => {
    /* ID generated in server */
    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
    })
    const data = await res.json()

    /*  Save new task */
    setTasks([...tasks, data])

    /* ID generated manually */
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  /* Task - Delete */
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(
      tasks.filter((task) =>
        task.id !== id
      ))
  }

  /* Task - Toggle Reminder */
  const toggleTaskReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ?
          { ...task, reminder: data.reminder } :
          task
      ))
  }
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && // && allows IF ternary without else
              <AddTask
                onAdd={addTask}
              />
            }{tasks.length > 0 ? // Ternery function
              (<Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleTaskReminder}
              />) : // Then & Else
              ('All tasks complete')
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
