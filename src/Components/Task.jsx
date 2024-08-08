import React, { useContext } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import { GrCheckmark } from "react-icons/gr";
import TodoContext from '../Context/TodoContext';
import Umodal from './Umodal';
import { useState } from 'react';

function Task({id,task}) {
  const {TaskArray,setTaskArray,modifyTask,modifyStatus,deleteTask} = useContext(TodoContext)
  const [umodal, setumodal] = useState(false)

  return (
    <div name="wrapper" className=' w-full p-[10px] flex justify-between bg-[#f8f8ff] rounded-[4px]'>
      <div name="child1" className='flex gap-2'>
        <div name="box" onClick={() => modifyStatus(id,task.status)} className={`rounded-[3px] h-[25px] w-[25px] translate-y-[3px] flex justify-center items-center  ${task.status === 'incomplete' ? 'bg-gray-200 text-gray-200':'bg-[#412fe7] text-white'}`}><GrCheckmark size={20}/></div>
        <div name="info" className='flex flex-col'>
          <p className={`font-serif text-[14px] ${task.status === 'completed' ? 'line-through text-gray-500':''}`}>{task.title}</p>
          <p className='font-serif text-[12px] mt-[-7px]'>{task.date_time}</p>
        </div>
      </div>

      <div name="child2" className='flex gap-2'>
        <button name="delete" onClick={() => deleteTask(id)} className='flex justify-center items-center rounded-[3px] h-[25px] w-[25px] translate-y-[3px] bg-gray-200 hover:bg-gray-300'><MdDelete/></button>
        <button name="update" onClick={() => setumodal(prev => !prev)} className='flex justify-center items-center rounded-[3px] h-[25px] w-[25px] translate-y-[3px] bg-gray-200 hover:bg-gray-300'><MdEdit/></button>
      </div>

      {/* Modal part */}
      {umodal && <Umodal className="transition-all duration-[2s] " type="update" task={task} state={[umodal,setumodal]}/>}    

    </div>
  )
}

export default Task