import React, { useContext } from 'react'
import TodoContext from '../Context/TodoContext'

function MyButton({bgcolour,textcolour,text,onclick}) {
  return (
    <button onClick={onclick} style={{backgroundColor: bgcolour,color:textcolour}} className='text-xl py-2 px-5 rounded-[8px] max-w-max'>{text}</button>
  )
}

export default MyButton