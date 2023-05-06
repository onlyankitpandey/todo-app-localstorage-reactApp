import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Box
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { FaEdit } from "react-icons/fa";
import ConfirmationDialogBox from "./ConfirmationDialogBox";
const TodoCard = ({ data, classes, todoItems, setAddEditToggle, setTodoData, setEditItemId, setTodoItems }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [itemsId, setItemsId] = useState("");
  const handleopenDelete = (id) => {
    setOpenDelete(true);
    setItemsId(id)
  }

  const editItemsHandler = (id) => {
    const filterdeEditableData = todoItems.find((data) => {
      return data.id === id
    })
    setTodoData({
      title: filterdeEditableData.title,
      description: filterdeEditableData.description
    })
    setEditItemId(id);
    setAddEditToggle(true);
  }

  const deleteItemsHandler = () => {
    const filterdeData = todoItems.filter((data) => data.id !== itemsId)
    setOpenDelete(false);
    setTodoItems(filterdeData);
  }

  return (
    <Paper my={2} className={classes.NewBreed}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" >{data?.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" >{data?.description}</Typography>
        </Grid>
      </Grid>
      <Box align="right">
        <Tooltip title="Edit Item">
          <IconButton variant="contained" color="primary" onClick={() => editItemsHandler(data.id)}><FaEdit /></IconButton>
        </Tooltip>
        <Tooltip title="Delete Item"><IconButton variant="contained" color="primary" onClick={() => handleopenDelete(data.id)}><DeleteIcon /></IconButton></Tooltip>
      </Box>
      <ConfirmationDialogBox title="Delete Task" desc="Are you sure want to delete this item ?" open={openDelete} handleClose={() => setOpenDelete(false)} actionHandler={deleteItemsHandler} />
    </Paper>
  )
}

export default TodoCard;