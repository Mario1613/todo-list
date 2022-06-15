
import './App.css';
import React from 'react';

function App() {

  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(()=>{
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if(loadedTodos){
      setTodos(loadedTodos)
    }
  },[])

  React.useEffect(()=>{
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);

  },[todos])





  function handleSubmit(e){
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }


  function deleteTodo(id){
    const updateTodos = [...todo].filter((todo)=> todo.id !== id);
    setTodos(updateTodos);
  }

  function toggleComplete(id){
    const updateTodos = [...todos].map((todo)=>{
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo
    })
    setTodos(updateTodos)
  }
  function editTodo(id){
    const updatedTodo = [...todos].map((todo)=>{
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodo);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={(e)=>setTodo(e.target.value)} value={todo}/>
        <button type="submit" >Add Todo-list</button>
      </form>
      {todos.map(todo => <div key={todo.id}>

      {todoEditing === todo.id? ( 
      <input type="text" onChange={(e)=>setEditingText(e.target.value)} value={editingText}/>
      )
      :
      
      ( <div>{todo.text}</div>)}
      
       
       
        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
        <input 
        type="checkbox" 
        onChange={()=> toggleComplete(todo.id)} 
        checked={todo.completed}/>
        {todoEditing === todo.id? (

        <button onClick={()=>editTodo(todo.id)}>Submit Edit</button>

        ):(

        <button onClick={()=>setTodoEditing(todo.id)}>Edit Todo</button>

        )}
    
    
      </div>)}
    





    </div>
  );
}

export default App;
