import { useState } from 'react'

function App() {
  const [tasks,setTasks] = useState([]);
  const [newTask,setNewTask] = useState('');
  const [isEditing,setIsEditing] = useState(null);  
  const [editingTask, setEditingTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditingTask(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>(i === index ? editingTask : task));
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditingTask('');
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md'>
    <h1 className='text-2xl font-bold text-center mb-4'>Task Tracker</h1>
    <div className='flex'>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add a new task'
      className='flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none' />
      <button onClick={addTask} className='bg-blue-400 text-white px-4 rounded-r-md'>Add</button>
    </div>
    <ul className='mt-4'>
      {tasks.map((task, index) => (
        <li key={index} className='flex items-center justify-between mt-2 p-2 border border-gray-300 rounded-md'>
          {isEditing === index ? (
            <input type='text' value={editingTask} onChange={(e) => setEditingTask(e.target.value)} className='flex-grow p-1 border border-gray-300 rounded-md'/>
          ) : (
            <span>{task}</span>
          )}
          <div className='flex space-x-2'>
            {isEditing === index ? (
              <>
              <button onClick={() => saveTask(index)} className='text-lime-500'>Save</button>
              <button onClick={() => setIsEditing(null)} className='text-red-500'>Cancel</button>
              </>
            ) : (
              <>
              <button onClick={() => startEditing(index)} className='text-blue-500'>Editing</button>
              <button onClick={() => deleteTask(index)} className='text-red-500'>Delete</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default App
