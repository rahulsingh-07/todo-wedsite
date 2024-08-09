import React, { useState } from 'react';
import Task from './Task'; // Adjust the import path as needed
import { IoAddCircle } from "react-icons/io5";

export default function DayTask({ day, tasks, addTask, deleteTask, doneTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(day, newTask);
      setNewTask('');
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-4">{day}</h2>
      
      <div className="border p-2 flex-grow rounded-lg">
        <div className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 flex-grow rounded-lg"
            placeholder="New task"
          />
          <button onClick={handleAddTask}>
            <IoAddCircle size={40} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        {tasks.map(task => (
          <Task 
            key={task._id} 
            task={task} 
            day={day} 
            deleteTask={deleteTask} 
            doneTask={doneTask} 
          />
        ))}
      </div>
    </div>
  );
}
