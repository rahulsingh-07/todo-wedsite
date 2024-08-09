import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import DayTask from '../components/DayTask'; // Adjust the import path as needed
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Home() {
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const { isLoggedIn } = useAuth();

  const fetchTasks = async () => {
    try {
      const tasksByDay = {};
      for (const day of allDays) {
        const response = await fetch(`http://localhost:8000/api/tasks/${day.toLowerCase()}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
          }
        });
        const data = await response.json();
        tasksByDay[day] = data; // Assuming data is an array of tasks
      }
      setTasks(tasksByDay);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (day, title) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${day.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
        },
        body: JSON.stringify({ title })
      });

      const savedTask = await response.json();

      setTasks(prev => ({
        ...prev,
        [day]: [...prev[day], savedTask]
      }));

      fetchTasks();
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (day, taskId) => {
    try {
      await fetch(`http://localhost:8000/api/tasks/${day.toLowerCase()}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
        }
      });

      setTasks(prev => ({
        ...prev,
        [day]: prev[day].filter(task => task._id !== taskId)
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const doneTask = async (day, taskId) => {
    try {
      await fetch(`http://localhost:8000/api/tasks/${day.toLowerCase()}/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
        }
      });

      setTasks(prev => ({
        ...prev,
        [day]: prev[day].map(task => task._id === taskId ? { ...task, done: true } : task)
      }));
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleDayClick = (day) => {
    if (!isLoggedIn) {
      toast.warn("Please log in to view tasks.");
      return;
    }
    setSelectedDay(day);
  };

  return (
    <div className=' my-8 bg-red-400 grid grid-cols-3 overflow-hidden border-4 border-b-gray-600 '>
      <nav className="ml-4 my-auto">
        <ul>
          {allDays.map((day) => (
            <li 
              key={day}
              className={`p-2 mx-2 text-3xl font-mono cursor-pointer border-b-black border-b-2 ${day === selectedDay ? "bg-blue-500 text-white" : ""}`} 
              onClick={() => handleDayClick(day)}
            >
              {day}
            </li>
          ))}
        </ul>
      </nav>
      <main className="col-span-2 ml-4 bg-red-300 h-[500px] overflow-auto">
        <AnimatePresence>
          {selectedDay ? (
            <motion.div
              key={selectedDay}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl p-2 text-black flex font-mono justify-center h-full"
            >
              <DayTask
                day={selectedDay}
                tasks={tasks[selectedDay]}
                addTask={addTask}
                deleteTask={deleteTask}
                doneTask={doneTask}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl p-2 text-black flex font-mono justify-center items-center h-full"
            >
              Please select a day to view tasks.
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
