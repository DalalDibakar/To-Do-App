import React, { useState } from 'react'
import { useContext } from 'react'
import TodoContext from '../Context/TodoContext'
import MyButton from './MyButton'
import toast from 'react-hot-toast'

function Umodal({type,task,state}) {
    const [umodal,setumodal]=state

  const {TaskArray,setTaskArray} = useContext(TodoContext)
  const [utask,setTask]= useState({
    key: task.key,
    title:task.title,
    status:task.status,
    date_time:task.date_time
  })

  function handleChange(event) {
    setTask({
      ...utask,
      [event.target.name]:event.target.value,
    })
  }

  const modifyTask = () => {
    let key = utask.key
    console.log(TaskArray[key-1])
    try {
      if(JSON.stringify(TaskArray[key-1]) === JSON.stringify(utask)){
        throw new Error("No changes made")
      }
      let NewTaskArray = TaskArray.map((task,i) => {
        if(i === key-1){
          return utask
        }
        else{
          return task
        }
        
      })
      setTaskArray(NewTaskArray)
      toast.success("Task updated successfully")
      setumodal(prev => !prev)
        
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  return (
    <div onClick={() => setumodal(prev => !prev)} className='z-10 w-screen h-screen bg-[#00000080] absolute top-0 left-0 flex justify-center items-center'>
      <div onClick={(event) => event.stopPropagation()} className='rounded-[8px] flex flex-col z-20 w-[40%]'>
      <div onClick={() => setumodal(prev => !prev)} className="flex bg-[#f8f8ff] px-3 py-1 rounded-[4px] max-w-max text-xl font-semibold self-end transition-colors duration-150 hover:cursor-pointer hover:bg-[#f50000] hover:text-white">X</div>
        <div className='flex flex-col my-3 bg-[#e8e8f2] px-5 rounded-[8px]'>
        <p className='text-xl font-bold mb-2 mt-5 text-gray-600'>Update TODO</p>
          <label className='w-full my-2'>
              <p className='my-2'>Title</p>
              <input name="title" onChange={handleChange} value={utask.title} className='w-full p-2' type='text' />
          </label>
          <label className='w-full my-2'>
              <p className='my-2'>Status</p>
              <select name="status" onChange={handleChange} value={utask.status} className='text-lg p-2 w-full'>
                <option value="completed" className='text-lg px-2 my-4'>Completed</option>
                <option value="incomplete" selected className='text-lg'>Incomplete</option>
              </select>
          </label>
          <div className='flex gap-3 my-5'>
            <MyButton onclick={modifyTask} bgcolour={'#7265e6'} textcolour={'white'} text={'Update Task'}/>
            <MyButton onclick={() => setumodal(prev => !prev)} bgcolour={'#d5d5dc'} textcolour={'#4b5563'} text={'Cancel'}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Umodal
