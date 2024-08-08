import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const TodoContext = createContext()
export function TodoContextProvider({children}) {
  const [TaskArray, setTaskArray] = useState(getInitialTodos())
  const [modal, setmodal] = useState(false)

  function getInitialTodos() {
    const temp = localStorage.getItem('todos')
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  function pushNewTask(obj) {
    try {
      if(obj.title === ""){
        throw new Error("Please enter a title")
      }
      setTaskArray([...TaskArray,obj])
      toast.success("New task added successfully")
      setmodal(prev => !prev)
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  const deleteTask = (key) =>{
    try{
        setTaskArray(TaskArray.filter( task => task.key != key ))
        toast.success("Task deleted successfully")
    }
    catch (error){
        toast.error("Failed to delete the task")
    }
  }


  const modifyStatus = (key,status) => {
    let new_status=''
    status === 'incomplete' ? new_status = 'completed' : new_status = 'incomplete'
    try {
      let NewTaskArray = TaskArray.map((task,i) => {
        if(i === key-1){
          return {
            ...task,
            status:new_status
          }
        }
        else{
          return task
        }
    })
    setTaskArray(NewTaskArray)
      
    } catch (error) {
        console.error("Failed to update status of the task"+error.message)
    }
    
  }

  useEffect(() => {
    const temp = JSON.stringify(TaskArray)
    localStorage.setItem('todos',temp)
  }, [TaskArray])
  

  const value = {
    TaskArray,
    setTaskArray,
    pushNewTask,
    deleteTask,
    modifyStatus,
    modal,
    setmodal,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;

}

export default TodoContext