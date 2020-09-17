import React, { useState } from 'react'
import "./Todo.css";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Todo(props) {

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
                }
            })
        )

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    
    const handleOpen = () => {
        setOpen(true);
    }

    const UpdateTodo = () => {
        // update todo with the new input text
        db.collections("todos").doc(props.todo.id).set({todo: input}, {merge: true})
        setOpen(false);
    }

    return (
        <div className="todo">
        {/* <Modal
            open = {open}
            onClose = {event => setOpen(false)}
        >
            <div className={classes.paper}>
                <input 
                    placeholder = {props.todo.todo}
                    value = {input}
                    onChange = {event => setInput(event.target.value)}
                />

                <Button onClick = {event => setOpen(false)}>
                    Update Todo
                </Button>
            </div>
        </Modal> */}

             <List className = "todo__list">
                <ListItem>
                    <ListItemText 
                        primary = {props.text}
                        // secondary = "target date"
                    />
                    <button onClick = {event => setOpen(true)}>Edit Me</button>
                </ListItem>
            
                {/* <DeleteForeverIcon
                    onClick = {event => db.collection("todos").doc(props.todo.id).delete()}
                >
                    Delete Me
                </DeleteForeverIcon> */}
            </List>
        </div>
    )
}

    
export default Todo
