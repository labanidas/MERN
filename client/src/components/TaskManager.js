// import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import AddTask from './AddTask'
import axios from 'axios';

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState('');
  const [isFlash, setFlash] = useState(false);

    /* function to get all  task */
  useEffect(() => {
    fetchAllTasks();
  },[])


  // error or sucess message 
  const setFlashMessage = (msg) => {
    setMessage(msg);
    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 3000);
  }

  const fetchAllTasks = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    }catch(err){
      setFlashMessage("Error loading task. Please try after sometime")
      console.log(err)
    }     
  };

  return (
    <div className='taskManager'>
      <header>Task Manager</header>

      <h4  className={`alert ${isFlash ? 'show' : 'hide'}`} >
      {message && <div className="success">{message}</div>}
      </h4>

      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.completed}
              title={task.title} 
              description={task.description}
              fetchAllTasks={fetchAllTasks}
              setFlashMessage={setFlashMessage}
            />
          ))}

        </div>
      </div>

      {openAddModal &&
        <AddTask 
        onClose={() => setOpenAddModal(false)} 
        open={openAddModal}
        fetchAllTasks={fetchAllTasks}
        setFlashMessage={setFlashMessage}
        />
      }

    </div>
  )
}

export default TaskManager
