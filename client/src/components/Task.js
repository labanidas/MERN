// import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import axios from 'axios';


function Task(props) {

  const {id, title, description, completed, fetchAllTasks, setFlashMessage} = props;

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to update task when checked*/
  const handleChange = async (id) => {
    const taskEndpoint = `http://localhost:5000/api/tasks/${id}`;

    try{
      const response = await axios.get(taskEndpoint);
      const taskData = response.data;
      await axios.put(taskEndpoint, {...taskData, completed: true });
    } catch (err) {
      setFlashMessage("Error marking task checked. Please try again")
      console.log(err)
    }
  }

  /* function to delete a task */ 
  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchAllTasks();
      setFlashMessage("Task Deleted")
    } catch (err) {
      setFlashMessage("Error deleting task. Please try again after sometime.")
      alert(err)
    }
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={()=>handleChange(id)}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={()=>handleDelete(id)}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          open={open.edit}
          id={id}
          fetchAllTasks={fetchAllTasks}
          setFlashMessage = {setFlashMessage}
         />
      }

    </div>
  )
}

export default Task