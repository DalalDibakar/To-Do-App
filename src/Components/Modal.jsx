import React, { useState } from 'react'
import { useContext } from 'react'
import TodoContext from '../Context/TodoContext'
import MyButton from './MyButton'
import { useRef } from 'react'

function Modal({type}) {

  const {modal,setmodal,pushNewTask,TaskArray,setTaskArray} = useContext(TodoContext)
  const [task,setTask]= useState({
    key: "",
    title:"",
    status:"incomplete",
    date_time:""
  })

  function handleChange(event) {
    setTask({
      ...task,
      key:TaskArray.length + 1,
      [event.target.name]:event.target.value,
      date_time: new Date().toLocaleString("fr-NE")
    })
  }

  return (
    <div onClick={() => setmodal(prev => !prev)} className='z-10 w-screen h-screen bg-[#00000080] absolute top-0 left-0 flex justify-center items-center'>
      <div onClick={(event) => event.stopPropagation()} className='rounded-[8px] flex flex-col z-20 w-[40%]'>
      <div onClick={() => setmodal(prev => !prev)} className="flex bg-[#f8f8ff] px-3 py-1 rounded-[4px] max-w-max text-xl font-semibold self-end transition-colors duration-150 hover:cursor-pointer hover:bg-[#f50000] hover:text-white">X</div>
        <div className='flex flex-col my-3 bg-[#e8e8f2] px-5 rounded-[8px]'>
        <p className='text-xl font-bold mb-2 mt-5 text-gray-600'>Add TODO</p>
          <label className='w-full my-2'>
              <p className='my-2'>Title</p>
              <input name="title" onChange={handleChange} value={task.title} className='w-full p-2' type='text' />
          </label>
          <label className='w-full my-2'>
              <p className='my-2'>Status</p>
              <select name="status" onChange={handleChange} value={task.status} className='text-lg p-2 w-full'>
                <option value="completed" className='text-lg px-2 my-4'>Completed</option>
                <option value="incomplete" selected className='text-lg'>Incomplete</option>
              </select>
          </label>
          <div className='flex gap-3 my-5'>
            <MyButton onclick={()=> pushNewTask(task)} bgcolour={'#7265e6'} textcolour={'white'} text={'Add Task'}/>
            <MyButton onclick={() => setmodal(prev => !prev)} bgcolour={'#d5d5dc'} textcolour={'#4b5563'} text={'Cancel'}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Modal
