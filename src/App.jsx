import { useState } from 'react'

function App() {
  const [tasks,setTasks] = useState([]);  {/* เก็บข้อมูลงานที่ถูกสร้างขึ้น */}
  const [newTask,setNewTask] = useState(''); {/* เก็บข้อมูลงานใหม่ */}
  const [isEditing,setIsEditing] = useState(null);   
  const [editingTask, setEditingTask] = useState(''); {/* เก็บข้อมูลงานทีแก้ */}
 
  const addTask = () => {
    if (newTask.trim()) {  /* เช็คว่าอันนี้อะ ที่เป็นข้อมูลไม่ว่างอะป่าวว ถ้าไม่ว่าง ลูกพี่ trim ไปลบให้ */
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); /* ลบน้อง tasks โดยใช้น้องรัก filter */
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditingTask(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>(i === index ? editingTask : task)); // เช็คครับว่า i เท่า index ป่าว ถ้าเท่าได้แก้ ไม่เท่า ไม่ได้แก้กันไป
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditingTask('');
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md'> {/* Ui */}
    <h1 className='text-2xl font-bold text-center mb-4'>Task Tracker</h1>
    <div className='flex'> {/* Ui เพิ่มงานอีกแล้ววววววววววววววววววววววววววววววววววววววว*/}
      {/* ที่ใส่ข้อมูลน้องใหม่ */}
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add a new task'
      className='flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none' />
      <button onClick={addTask} className='bg-blue-400 text-white px-4 rounded-r-md'>Add</button>
    </div>
    <ul className='mt-4'> {/* UI แสดงรายชื่องานนนนนนนนนนน */}
      {/* ใช้ map หาชื่อ ไม่มีไรเลย */}
      {tasks.map((task, index) =>  ( 
        <li key={index} className='flex items-center justify-between mt-2 p-2 border border-gray-300 rounded-md'>
          {isEditing === index ?  (
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
