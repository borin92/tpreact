import { useState, useEffect } from "react"

import Typography from '@mui/material/Typography';
import {
    useQuery,
} from 'react-query'



function TodoList() {
    // const [list, setlist] = useState(null)

    const { data: todos, isLoading } = useQuery('todos', () => fetch("http://localhost:3000/todos/getAll").then((res) => res.json()))

    if (isLoading) {

        return <div>Loading...</div>;

    }
    console.log(todos)
    return (
        todos.map(todo =>
            <Typography>{todo.title}</Typography>

        )

    )

}

export default TodoList