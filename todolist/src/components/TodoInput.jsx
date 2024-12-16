import React, { useState } from 'react'

export default function TodoInput(props) {
    const {addTodo}=props
    const [todoValue,setTodoValue]=useState('')
  return (
    <header>
        <input type='text' value={todoValue} 
        onChange={(e)=>{
            setTodoValue(e.target.value)
        }}
        placeholder='Enter the task......'/>
        <button onClick={()=>{
            addTodo(todoValue)
            setTodoValue('')
        }}>Add</button>
    </header>
  )
}
