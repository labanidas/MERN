import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    }catch(err){
      console.log(err)
    }
    
  };

  const deleteTask = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    }catch(err){
      console.log(err)
    }
    
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
