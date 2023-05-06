import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormHelperText,
  Paper,
  FormControl,
  Button,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";


import TodoCard from "./components/TodoCard";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "100px 0px 50px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "70px 0px 30px 0px",
    },
  },
  NewBreed: {
    backgroundColor: "#0F212E",
    padding: "20px",
    position: "relative",
    "& input::placeholder": {
      fontSize: "13px",
      fontWeight: 300,
    },
  },
  actionButtons: {
    position: "absolute",
    right: "10px",
    bottom: "15px"
  },
  input: {
    display: "none",
  },
}));


const getLocalStorageItems = () => {
  const listItems = localStorage.getItem('localStoragelist')
  if (listItems) {
    return JSON.parse(localStorage.getItem('localStoragelist'));
  } else {
    return []
  }
}


export default function App() {
  const theme = createTheme();
  const classes = useStyles();
  const [editItemId, setEditItemId] = useState("");
  const [IsSubmit, setIsSubmit] = useState(false);
  const [addEditToggle, setAddEditToggle] = useState(false);
  const [todoItems, setTodoItems] = useState(getLocalStorageItems());
  const [todoData, setTodoData] = useState({
    title: "",
    description: ""
  })

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodoData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const addItemsHandlers = () => {
    setIsSubmit(true);
    if (todoData.title === "" || todoData.description === "") {
      // window.alert("Please Enter Title and Descrition Input field properly!")
    } else if (todoData.title !== "" && todoData.description !== "" && addEditToggle) {
      setTodoItems(
        todoItems.map((currentItems) => {
          if (currentItems.id === editItemId) {
            return { ...currentItems, title: todoData.title, description: todoData.description }
          }
          return currentItems;
        })
      )
      setTodoData({
        title: "",
        description: ""
      })
      setAddEditToggle(false);
      setIsSubmit(false);
    } else {
      const allInputData = { id: new Date().getTime().toString(), title: todoData.title, description: todoData.description }
      setTodoItems([...todoItems, allInputData])
      setEditItemId(null);
      setAddEditToggle(false);
      setTodoData({
        title: "",
        description: ""
      })
      setIsSubmit(false);
    }

  }

  useEffect(() => {
    localStorage.setItem('localStoragelist', JSON.stringify(todoItems))
  }, [todoItems])

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box className={classes.wrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Container maxWidth="lg">
                <Paper className={classes.NewBreed}>
                  <Box mb={2} align="center">
                    <Typography variant="h3">Create Your Task</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Typography variant="body2" >
                          Title
                        </Typography>
                        <TextField
                          variant="outlined"
                          placeholder="Enter title"
                          name="title"
                          fullWidth
                          size="small"
                          value={todoData.title}
                          onChange={handleDataChange}
                        />
                        {IsSubmit && todoData.title === "" && <FormHelperText error>
                          Please Enter Title.
                        </FormHelperText>}

                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Typography variant="body2">
                          Description
                        </Typography>
                        <TextField
                          name="description"
                          placeholder="Write something..."
                          value={todoData.description}
                          style={{ marginTop: "0px" }}
                          variant="outlined"
                          fullWidth
                          onChange={handleDataChange}
                          multiline
                          minRows={4}
                          inputProps={{ className: classes.cls, maxLength: 800, }}
                        />
                        {IsSubmit &&
                          todoData.description === "" && <FormHelperText error>
                            Please Enter Description.
                          </FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <Box pt={3} align="center">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={addItemsHandlers}
                        >
                          {!addEditToggle ? "Add Task" : "Edit Task"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  {todoItems?.map((data, index) => {
                    return (
                      <Grid item xs={12}>
                        <TodoCard
                          todoItems={todoItems}
                          classes={classes} data={data} key={index}
                          setAddEditToggle={(items) => setAddEditToggle(items)}
                          setTodoData={(items) => setTodoData(items)}
                          setEditItemId={(items) => setEditItemId(items)}
                          setTodoItems={(items) => setTodoItems(items)}
                        />
                      </Grid>
                    )
                  })}
                  {todoItems.length === 0 ? "No Task Found Please add your Task" : ""}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
