import React, { useState } from 'react'
import "./Todo.css";

import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = 
        makeStyles(
            theme => ({
                paper: {
                    position: "absolute",
                    width: 400,
                    backgroundColor: theme.palette.background.paper,
                    border: "2px solid #000",
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(2,4,3)
                },
            })
        )

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo.todo);
    
   
    const updateTodo = () => {
        db.collection("todos").doc(props.todo.id).set({todo: input}, {merge: true});
        setOpen(false);
    }

    return (
        <div className="todo">

        <Modal
            open = {open}
            onClose = {event => setOpen(false)}
            border = "2px solid red"
            background-color="red"
        >
            <form>
                
                    <div className={classes.paper}>
                        <h2>Update ToDo:</h2>
                        <input 
                            placeholder = {props.todo.todo}
                            value = {input}
                            onChange = {event => setInput(event.target.value)}
                        />
                          <Button
                            // disabled = {!input}
                            type = "submit"
                            onClick = {updateTodo}
                            variant = "contained"
                            color = "primary"
                            >Update Todo</Button>
                    </div>
                
            </form>
        </Modal>
 
            <div className="todo__items">
                <div>
                    <p>{props.todo.todo}</p>
                </div>
                <div className="todo__icons">
                    <EditIcon 
                        color="primary"
                        onClick = {event => setOpen(true)}
                    />
                    <DeleteForeverIcon 
                        color="secondary"
                        onClick = {
                                    event => db.collection("todos").doc(props.todo.id).delete()
                                  }    
                    />
                </div>
            </div>
        </div>
    )
}

 
export default Todo
