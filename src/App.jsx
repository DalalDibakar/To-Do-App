
import './App.css';
import MyButton from './Components/MyButton';
import NoTodos from './Components/NoTodos';
import { useContext } from 'react';
import TodoContext from './Context/TodoContext';
import Modal from './Components/Modal';
import Task from './Components/Task';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const {TaskArray,modal,setmodal} = useContext(TodoContext)
  const [RenderTask, setRenderTask] = useState(TaskArray)
  const [option, setOption] = useState('All')

  const openModal = () => {
    setmodal(prev => !prev)
  }

  useEffect(() => {
    if(option != 'All'){
      setRenderTask(TaskArray.filter(task => task.status === option))
    }
    else{
      setRenderTask(TaskArray)
    }
  }, [TaskArray,option])
  

  return (
    <div className="flex justify-center w-screen h-screen bg-[#f8f8ff] z-0 relative">
    <div className='w-3/5 flex flex-col'>
      <h1 className='text-center text-5xl font-bold text-gray-600 my-4'>TODO LIST</h1> 
      <div className='flex justify-between my-3'>
        <MyButton onclick={openModal} bgcolour={'#7265e6'} textcolour={'white'} text={'Add Task'}/>
          <select name="filter" onChange={(e) => setOption(e.target.value)} className='text-lg py-2 px-6 rounded-[8px] bg-gray-300'>
            <option value="All" className='text-lg'>All</option>
            <option value="completed" className='text-lg'>Completed</option>
            <option value="incomplete" className='text-lg'>Incomplete</option>
          </select>
      </div>
      <div className='bg-gray-200 gap-[15px] flex flex-col justify-center items-center p-5 my-2 rounded-[8px]'>
        {
          RenderTask.length == 0 ? 
          (<NoTodos />):
          (
            RenderTask.map( task => <Task key={task.key} id={task.key} task={task}/>)
          )
        }

      </div>

      {/* Modal part */}
      {modal && <Modal className="transition-all duration-[2s] " type="creation"/>}    

      

      </div>
    </div>
  );
}

export default App;
