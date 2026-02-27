import { use, useState } from 'react'

import './App.css'
import { Todoprovider } from './context/index';

import { TodoForm, TodoItem } from './components/index';
import { useEffect } from 'react';
import React from 'react';
import { useTodo } from './context/index';
function App() {
 const [todos,setTodos]=useState([]);
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo
},...prev])
}
  const updatedTodo = (id, todo) => {
  setTodos(prev => prev.map((prevtodo) => prevtodo.id === id ? todo : prevtodo));
}

   const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id));
}

 const toggleComplete = (id) => {
  setTodos((prev) => prev.map((todo)=> todo.id === id ? {...todo, completed: !todo.completed} : todo));
}
useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem('todos'));
    if(storedTodos&&storedTodos.length>0){
        setTodos(storedTodos);
    }
   },[]);
    useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
   },[todos]);
   
    return (
    <Todoprovider value= {{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
 <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
  {todos.map((todo) => (
    <div className="w-full" key={todo.id}>
      <TodoItem todo={todo} />
    </div>
  ))}
</div>

                </div>
            </div>
    </Todoprovider>
  )
}

export default App
