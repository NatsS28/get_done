import { Button, IconButton, ListItemIcon, Menu, MenuItem, Paper, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Delete, Edit, MoreVertOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import humanizeDuration from "humanize-duration";
import { withStyles } from '@material-ui/styles';
import {
    red,
    pink,
    green,
    purple,
    blue,
    teal,
    lime,
    yellow,
    grey,
    deepOrange,
} from "@material-ui/core/colors";

const colors = {
    red,
    pink,
    green,
    purple,
    blue,
    teal,
    lime,
    yellow,
    grey,
    deepOrange,
};
function Goal({ goal, setGoals, globalHashTags }) {
    
    
    const [modelOpen, setModelOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [editing, setEditing] = useState(false);

    const [displaySeconds, setDisplaySeconds] = useState(
        goal.isActive
            ? goal.duration +
            (new Date().getTime() -
                new Date(goal.latestStartTimeStamp).getTime()) /
            1000
            : goal.duration
    );
    //3dot menu control
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleClickOpen = () => {
        setModelOpen(true);
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (goal.isActive) {
                setDisplaySeconds((previousSeconds) => previousSeconds + 1);
            }
        }, 1000);
        console.log(myInterval);

        return () => {
            clearInterval(myInterval);
        }
    })

    const renderHashTags = (hashTags) => {
        const colorchip = [];

        for (let key in hashTags) {
            const ColorButton = withStyles((theme) => ({
                root: {
                    color: theme.palette.getgetContrastText(
                        colors[hashTags[key].color][500]
                    ),  
                    backgroundColor: colors[hashTags[key].color][500],
                    "&:hover": {
                        backgroundColor: colors[hashTags[key].color][700],
                    },
                }
            }))(Button)

            colorchip.push(
                <ColorButton
                    size='small'
                    key={hashTags[key]._id}
                >
                    {hashTags[key].tag}
                </ColorButton>
            )
        }

    }

  return (
      <Paper elevation={2}>
          <div>
              <Typography variant='h4' gutterBottom>
                  {goal.name}
              </Typography>
              <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
              >
                  <MoreVertOutlined />
              </IconButton>
              <Menu
                  id='long-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleCloseMenu}
              >
                  <MenuItem
                      onClick={() => {
                          setEditing(true);
                          handleCloseMenu();
                      }}
                  >
                      <ListItemIcon>
                          <Edit fontSize='small'/>
                      </ListItemIcon>
                      <Typography variant='inherit'>Edit</Typography>
                  </MenuItem>
                  <MenuItem
                      onClick={() => {
                          handleClickOpen();
                          handleCloseMenu();
                      }}
                  >
                      <ListItemIcon>
                          <Delete fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Delete</Typography>
                  </MenuItem>
              </Menu>
          </div>
          <Typography
              variant='body1'
              gutterBottom
              style={{ fontSize: "1.4rem" }}
          >
              {goal.description}
          </Typography>
          <Typography>
              {" "}
              You have spent{" "}
              {humanizeDuration(displaySeconds * 1000,{round:true})} on this task
          </Typography>
          {
              goal?.hashTags && goal?.hashTags.length !== 0 &&
              renderHashTags(goal.hashTags)
          }
    </Paper>
  )
}

export default Goal