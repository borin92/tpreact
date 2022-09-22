import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoteIcon from '@mui/icons-material/Note';
import TextField from '@mui/material/TextField';

import { useMutation, useQueryClient } from 'react-query';

import InputAdornment from '@mui/material/InputAdornment';

const createTodo = async (title, queryClient) => {
    if (!title) return null
    const { data: response } = await fetch('http://localhost:3000/todos/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            status: 'active'
        })
    })
        .then(response => response.json())
        .then(() => {
            console.log("koukou");
            queryClient.invalidateQueries('todos')
        });
    return response;
};


const TodoInput = () => {
    const queryClient = useQueryClient();
    const [newTodo, setnewTodo] = useState()


    const handleChange = ((e) => {
        setnewTodo(e.target.value)
    })

    const handleClick = useCallback(
        async (event) => {
            event.preventDefault()
            await createTodo(newTodo, queryClient)
        },
        [newTodo, queryClient],
    )

    return (
        <Card sx={{ maxWidth: 345 }}>

            <CardContent>
                <TextField
                    onChange={handleChange}
                    fullWidth
                    id="input-with-icon-textfield"
                    label="TextField"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <NoteIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />

            </CardContent>

            <CardActions>
                <Button type='submit' variant="contained" size="small" fullWidth onClick={handleClick} >Add new task</Button>
            </CardActions>
        </Card >
    );
}
export default TodoInput;
