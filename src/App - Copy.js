import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel, List} from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";


function App() {
  const [todos, setTodos] = useState(['read books','take a walk','watch netflix','code react']);
  // const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const runlocal=true;

  const addTodo = (event) => {
    event.preventDefault();
      if (runlocal){
        //---> add to local array
        setTodos([...todos, input]);
      }else{
        //---> add to firebase
        db.collection('todos').add({
          todo: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
      setInput('');
  }

  
  useEffect(() => {
    // -- code fires when app loads. run once if no condition
    if (runlocal){
      // do nothing
    }else{
      setTodos([]);
      db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
      }) 
    }
  }, []);

  return (
    <div className="app">
      <h1>ToDo App</h1>

      <form>
        <FormControl>
          <div className="todo__entry"> 
              <InputLabel>write a ToDo item here</InputLabel>
              <Input 
                value = {input} 
                onChange = {event => setInput(event.target.value)}
              ></Input> 

            <Button
              disabled = {!input}
              type = "submit"
              onClick = {addTodo}
              variant = "contained"
              color = "primary"
            >Add Todo</Button>
          </div>
          <List>
            {todos.map (todo => (
              <Todo runlocal={runlocal} todo={todo}/>
               
              ))
            }
          </List>
        </FormControl>
      </form>
    </div>
  )
}

export default App;
