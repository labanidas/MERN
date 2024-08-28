import Modal from "./Modal"
import {useState} from 'react'
import axios from 'axios';
// import './addTask.css'


function AddTask(props) {

  const {onClose, open, fetchAllTasks, setFlashMessage} = props;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  /* function to add new task*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: title,
      description: description,
      completed: false
    };

    try {
      await axios.post('http://localhost:5000/api/tasks', taskData);
      onClose();
      fetchAllTasks();
      setFlashMessage("Task added successfully!");
      
    } catch (err) {
      setFlashMessage("Error adding task . Please try after sometime");
      console.log(err)
    }
  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
