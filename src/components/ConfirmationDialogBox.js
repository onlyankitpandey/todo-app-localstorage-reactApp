import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';

const ConfirmationDialogBox = ({ title, desc, open, handleClose, actionHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle align="center">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={() => actionHandler()} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialogBox;



