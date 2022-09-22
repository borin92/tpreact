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

const createEmployee = async (data) => {
    /*   const { data: response } = await axios.post('https://employee.free.beeceptor.com/create', data);
      return response.data; */
    const { data: response } = await fetch('http://localhost:3000/todos/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data,
            status: 'somethingElse'
        })
    });
    console.log(data)
    return response.data;
};

function TodoInput() {
    const [newTodo, setnewTodo] = useState()
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(createEmployee, {
        onSuccess: data => {
            console.log(data);
            const message = "success"
            alert(message)
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });

    const handleClick = useCallback(
        () => {
            mutate(newTodo)
        },
        [],
    )

    const handleChange = ((e) => {
        setnewTodo(e.target.value)

    })




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
                <Button variant="contained" size="small" fullWidth onClick={handleClick}>Add new task</Button>
            </CardActions>
        </Card>
    );
}
export default TodoInput;
