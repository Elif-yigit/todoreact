import { useState } from 'react'
import './App.css'

function App() {
  
  const [todos,setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filterType , setFilterType] = useState('All');
 
  function handleChange(e){

    // console.log(e.target.value);
    setInputValue(e.target.value);
  }

  function handleClick() {
  // console.log(e.target.value);
  setTodos([...todos,{
    id:todos.length > 0 ? todos[todos.length-1].id +1 :1,
    content:inputValue,
    isCompleted:false
  }]);
  setInputValue('');

  }

  function handleCheckbox(e, todo) {

  console.log(todo);

  todo.isCompleted = !todo.isCompleted;
  setTodos([...todos])
   
  }

  function handleDelete (i) {

    const todoNew = [...todos]
    todoNew.splice(i,1)
    setTodos(todoNew)
  }

  function filteredTodos(todos,filterType) {
      if(filterType === 'completed') {
        return todos.filter(todo => todo.isCompleted);
      } else if (filterType === 'incompleted') {
        return todos.filter(todo => !todo.isCompleted);
      } else {
        return todos;
      }

  }
  
  const filtered = filteredTodos(todos, filterType)
  return (
    <>
     <div className='todo-container'>
      <input type='text' value={inputValue} placeholder='Todo giriniz' onChange={handleChange}/>
      <button disabled={inputValue.trim() == ""} onClick={handleClick} className='add-btn'>Ekle</button>
     </div>
    <ul>
      
        {filtered.map((todo,i)=>(
           <li key={todo.id}>
            <label htmlFor={`todo-${todo.id}`}>
            <input id={`todo-${todo.id}`} type='checkbox' onChange={(e) => handleCheckbox(e,todo) } />
            
            
            </label>
              <span className={`${todo.isCompleted ? "line-through" : ""}`}>{todo.content}</span>
              <button onClick={() => handleDelete(i)}>Delete</button>
          </li>
        ))}

        <button onClick={() => setFilterType('All')}>Tümü</button>
        <button onClick={() => setFilterType('completed')}>Tamamlanan</button>
        <button onClick={() => setFilterType('incompleted')}>Tamamlanmayan</button>   

    </ul>


        <ul>
          {/* {
            filteredTodos.map((todo) => (
              <li key={todo.id}>
               {todo.isCompleted ? "(Tamamlandı)" : "Tamamlanmadı"}
              </li>
            )

           )
          }
        </ul> */}
    {/* <div>
      <ul>
        {todos.map((todo, i) =>
        <li key={i}>{todo.content}
        
        </li>
        )}
      </ul>
    </div>
       */}
       </ul>
    </>
  )
}

export default App