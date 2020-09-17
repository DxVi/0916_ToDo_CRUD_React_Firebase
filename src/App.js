import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import { DeleteForeverIcons } from '@material-ui/icons';

function App() {

  useEffect(() => {
    // code fires when app loads. run once if no condition
    // orderBy("timestamp", "desc").
    // db.collection("todos").onSnapshot(snapshot => {
    //   setTodos(snapshot.docs.map(doc => doc.data().doc))
    // }) 
  }, []);
 
  const addTodo = (event) => {
    event.preventDefault();
    // firebase
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // local array
    // setTodos([...todos, input]);
    setInput('');
  }

   const [todos, setTodos] = useState(['read books','take a walk','watch netflix','code react']);
  // const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  return (
    <div className="app">
      <h1>ToDo App</h1>

      <form>
        <FormControl>  
          <InputLabel>write a ToDo item here...</InputLabel>
          <Input 
            value = {input} 
            onChange = {event => setInput(event.target.value)}
          ></Input> 
          <br/>
          <Button
            disabled = {!input}
            type = "submit"
            onClick = {addTodo}
            variant = "contained"
            color = "primary"
          >Add Todo</Button>
        </FormControl>
      </form>

      <ul>
        {todos.map (todo => (
          <Todo text={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
