import { useState ,useEffect} from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
function App() {

const [todos,setTodos]=useState([])
const [todoValue,setTodoValue]=useState('')

function persistData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}

  function addTodo(newTodo){
    const newTodoList=[...todos,newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
    
  }
  function deleteTodo(index){
    const newTodoList =todos.filter((todo,todoIndex)=>{
      return todoIndex!==index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  function editTodo(index){
    const oldValue=todos[index]
    setTodoValue(oldValue)
    deleteTodo(index)
  }
  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodo=localStorage.getItem('todos')
    if(!localTodo){
      return
    }
    localTodo=JSON.parse(localTodo).todos
    setTodos(localTodo)
  },[])
  return (
    <>
    <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} addTodo={addTodo}/>
    <TodoList deleteTodo ={deleteTodo} editTodo={editTodo} todos={todos}/>
    </>
  )
}

export default App
