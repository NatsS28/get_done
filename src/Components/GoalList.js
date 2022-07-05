import { IconButton, InputBase, ListItemIcon, Menu, MenuItem, MenuList, Paper, Typography } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, SearchOutlined, Sort, SortOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import UseInputState from '../hooks/UseInputState';
import Goal from './Goal';
import SelectedHashTag from './SelectedHashTag';

function GoalList({ goals, setGoals, globalHashTags }) {

    const [searchText, setSearchText, resetSearchText] = UseInputState();
    const [selectedHashtags, setSelectedHashtags] = useState({});
    const [filteredGoals, setFilteredGoals] = useState(goals);
    const [sortedGoals, setSortedGoals] = useState(filteredGoals);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        console.log(goals);
    })


    const renderGoals = () => {
        return sortedGoals.map((goal) => (
            <Goal
                goal={goal}
                setGoals={setGoals}
                globalHashTags={globalHashTags}
                key={goal._id}
            />
        ))
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
  return (
      <div>
          <div>
              <Paper elevation={2} component="div">
                  <InputBase
                      placeholder="Search Goals"
                      inputProps={{ "aria-label": "search Goals" }}
                      value={searchText}
                      onChange={setSearchText}
                  >
                      <div>
                          <SearchOutlined/>
                      </div>
                  </InputBase>
              </Paper>
              <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
              >
                  <Sort/>
              </IconButton>
          </div>
          <div>
              <Typography style={{ fontSize: "1.5rem" }}>
                  Select hashTags to filer by
              </Typography>
              <SelectedHashTag
                  selectedHashtags={selectedHashtags}
                  setSelectedHashtags={setSelectedHashtags}
                  globalHashTags={globalHashTags}
              />
          </div>
          <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
          >

              <MenuList>
                  <MenuItem
                      onClick={() => {
                          setSortedGoals((prevGoals) => {
                              return prevGoals.sort(function (a, b) {
                                  const duration1 = a.isActive
                                      ? a.duration +
                                      (new Date().getTime() -
                                          new Date(a.latestStartTimeStamp).getTime()) /
                                      1000
                                      : a.duration;

                                  const duration2 = b.isActive
                                      ? b.duration +
                                      (new Date().getTime() -
                                          new Date(b.latestStartTimeStamp).getTime()) /
                                      1000
                                      : b.duration;
                                  return duration1 - duration2;
                              });
                          });
                          handleClose();
                      }}
                  >
                      <ListItemIcon>
                          <ArrowDownwardOutlined fontSize='small'/>
                      </ListItemIcon>
                      <Typography variant='inherit'>Time Spent</Typography>
                  </MenuItem>
                  <MenuItem
                      onClick={() => {
                          setSortedGoals((prevGoals) => {
                              return prevGoals.sort(function (a, b) {
                                  const duration1 = a.isActive
                                      ? a.duration +
                                      (new Date().getTime() -
                                          new Date(a.latestStartTimeStamp).getTime()) /
                                      1000
                                      : a.duration;

                                  const duration2 = b.isActive
                                      ? b.duration +
                                      (new Date().getTime() -
                                          new Date(b.latestStartTimeStamp).getTime()) /
                                      1000
                                      : b.duration;
                                  return duration2 - duration1;
                              });
                          });
                          handleClose();
                      }}
                  >
                      <ListItemIcon>
                          <ArrowUpwardOutlined fontSize="small"/>
                      </ListItemIcon>
                      <Typography variant='inherit'>Time Spent</Typography>
                  </MenuItem>
              </MenuList>
          </Menu>
          {renderGoals()}
    </div>
  )
}

export default GoalList