import React from 'react';
import { IoAdd, IoCheckmarkDoneOutline } from "react-icons/io5";

export default function Task({ task, day, deleteTask, doneTask }) {
  return (
    <div className={`flex justify-between items-center p-2 bg-gray-100 rounded my-2 ${task.done ? "strikethrough-blue" : ""}`}>
      <span>{task.title}</span>
      <div className='flex gap-2'>
        <button 
          onClick={() => doneTask(day, task._id)} 
          disabled={task.done} 
          className="bg-green-500 text-white rounded-full p-1"
        >
          <IoCheckmarkDoneOutline style={{ width: 30 }} />
        </button>
        <button onClick={() => deleteTask(day, task._id)} className="bg-red-500 text-white rounded-full p-1">
          <IoAdd size={30} style={{ transform: 'rotate(45deg)', transition: 'transform 0.3s ease' }} />
        </button>
      </div>
    </div>
  );
}
