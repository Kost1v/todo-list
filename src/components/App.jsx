import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addTask, deleteTask, getAllTasks } from "../api/operations";
import toast, { Toaster } from "react-hot-toast";
// interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const formAddTask = async (e) => {
    e.preventDefault();
    const formValue = e.target.task;
    if (!newTask.trim()) return;
    try {
      setLoading(true);
      await addTask(newTask);
      console.log(await getAllTasks());
      setTasks(await getAllTasks());
      setLoading(false);
      setNewTask("");
      toast.success("Task add");
    } catch (error) {
      toast.error(error);
    } finally {
      formValue.value = "";
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks(await getAllTasks());
      setLoading(false);
      toast.success("Task delete");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <h1>Todo List</h1>
      <Toaster />
      <form onSubmit={formAddTask}>
        <TextField
          id="outlined-basic"
          label="Enter task"
          variant="outlined"
          name="task"
          size="small"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            ml: 2,
            "&:hover": { bgcolor: "blue" },
          }}
        >
          Add task
        </Button>
      </form>
      {loading && "Loading"}
      <List>
        {tasks !== null &&
          tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                border: "1px solid grey",
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" component="p">
                {task.title}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteTask(task.id)}
                sx={{
                  ml: 2,
                  "&:hover": { bgcolor: "red", color: "white" },
                }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default App;
