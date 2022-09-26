import TodoInput from "./components/todoinput.js"
import TodoList from "./components/todolist.js"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto"
  }
}));
function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TodoInput></TodoInput>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
