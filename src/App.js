import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel, List } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  
  // const [todos, setTodos] = useState(['read books','take a walk','watch netflix','code react']);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // -- code fires when app loads. run once if no condition
        db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
              setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
            }) 
    }, []);
 
  const addTodo = (event) => {
    event.preventDefault();

      // -- add to firebase
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      // -- add to local array
      // setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div className="app">
      <h1>ToDo App</h1>

      <form>
        <FormControl>  
          <InputLabel>write a ToDo item here</InputLabel>
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

          <List>
            {todos.map (todo => (
              <Todo todo={todo}/>
            ))}
          </List>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
