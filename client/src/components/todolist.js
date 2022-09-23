import { React, useState, useCallback, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import { useQueryClient } from 'react-query';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    useQuery,
} from 'react-query'

const removeTodo = async (id, queryClient) => {
    if (!id) return null
    const { data: response } = await fetch('http://localhost:3000/todos/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => response.json())
        .then(() => {
            queryClient.invalidateQueries('todos')
        });
    return response;
};

const toggleTodo = async (id, queryClient) => {
    if (!id) return null
    const { data: response } = await fetch('http://localhost:3000/todos/toggleTodo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => response.json())
        .then(() => {
            queryClient.invalidateQueries('todos')
        });
    return response;
};

const deleteAll = async (queryClient) => {

    const { data: response } = await fetch('http://localhost:3000/todos/deleteAll', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            queryClient.invalidateQueries('todos')
        });
    return response;
};

const deleteAllDone = async (queryClient) => {

    const { data: response } = await fetch('http://localhost:3000/todos/deleteAllDone', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            queryClient.invalidateQueries('todos')
        });
    return response;
};



function TodoList() {

    const queryClient = useQueryClient();
    // const [list, setlist] = useState(null)
    const [list, setlist] = useState()

    const { data: todos, isLoading } = useQuery('todos', () => fetch("http://localhost:3000/todos/getAll").then((res) => res.json()))
    useEffect(() => {
        if (!isLoading) {
            setlist(todos);
        }

    }, [isLoading, todos])


    if (isLoading || !todos) {
        return <div>Loading...</div>;

    }



    return (
        <>
            <Button color="info" variant="contained" onClick={() => setlist(todos)} > display all</Button >
            <Button color="success" variant="contained" onClick={() => setlist(todos.filter(e => e.state === true))} > display all done</Button >
            <Button color="warning" variant="contained" onClick={() => setlist(todos.filter(e => e.state === false))} > display all active</Button >

            {
                list && list.map(todo =>
                    <Card >
                        <Typography>{todo.title}</Typography>
                        <IconButton aria-label="delete">
                            <DeleteIcon id={todo.id} onClick={(e) => removeTodo(e.target.parentElement.id, queryClient)} />
                        </IconButton>

                        <Checkbox checked={todo.state} id={todo.id} onClick={(e) => toggleTodo(e.target.id, queryClient)} />
                    </Card>
                )

            }
            <Button color="error" variant="contained" onClick={() => deleteAll(queryClient)} > Delete all</Button >
            <Button color="error" variant="contained" onClick={() => deleteAllDone(queryClient)} > Delete all done</Button >


        </>
    )

}

export default TodoList