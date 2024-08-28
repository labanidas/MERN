import Modal from "./Modal"
import {useState} from 'react'
import axios from 'axios';
// import './editTask.css'

function EditTask(props) {

  const {open, onClose, toEditTitle, toEditDescription, id, fetchAllTasks, setFlashMessage} = props;

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)

  /* function to update task */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskEndpoint = `http://localhost:5000/api/tasks/${id}`;
    
    const taskData = {
      title: title,
      description: description
    };

    try{
      await axios.put(taskEndpoint, taskData);
      onClose();
      fetchAllTasks();
      setFlashMessage("Task updated!")
    } catch (err) {
      setFlashMessage("Error updating task. Please try after sometime")
      console.log(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
