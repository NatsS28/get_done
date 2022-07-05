import { Fab, Paper, TextField, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import UseInputState from '../hooks/UseInputState'

function NewGoalForm({ setGoals, globalHashTags}) {

    const [name, setName, resetName] = UseInputState("");
    const [descr, setDescr, resetDescr] = UseInputState("");
    const [hashTags, setHashtags] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newGoal = {
            _id: uuidv4(),
            name,
            description: descr,
            timeAdded: new Date(),
            hashTags,
            duration: 0,
            isActive:false,
        }

        setGoals((prevGoals) => {
            return [...prevGoals, newGoal];
        })
    }
  return (
      <Paper elevation={2}>
          <form onSubmit={handleFormSubmit}>
              <div>
                  <Typography
                      variant='h1'
                      component="h1"
                      gutterBottom
                      align="center"
                      style={{ fontSize: "4rem", marginTop: "1.5rem" }}
                  >
                      Add your new task
                  </Typography>
                  <TextField
                      id="standard-full-width"
                      label="Goal title"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="dense"
                      value={name}
                      required
                      onChange={setName}
                  >    
                  </TextField>
                  <TextField
                      id="standard-full-width-2"
                      label="Goal description"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="dense"
                      value={descr}
                      onChange={setDescr}
                  ></TextField>
                  <Fab
                      color="primary"
                      aria-label="add"
                      type="submit"
                  >
                      <Add />
                  </Fab>
              </div>
          </form>
    </Paper>
  )
}

export default NewGoalForm