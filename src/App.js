import { AppBar, Button, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography,Link,Box,Container } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route,useNavigate } from "react-router-dom";
import NewGoalForm from './Components/NewGoalForm';
import GoalList from './Components/GoalList';
import UseLocalStateStorage from './hooks/UseLocalStateStorage';

function App() {

    const navigate = useNavigate();

    const [globalHashTags, setGlobalHashTags] = UseLocalStateStorage("hashtags", [
        { _id: "0", tag: "health", color: "green" },
        { _id: "1", tag: "love", color: "red" },
        { _id: "2", tag: "personal", color: "teal" },
        { _id: "3", tag: "family", color: "lime" },
        { _id: "4", tag: "academic", color: "blue" },
    ]);

    const [goals, setGoals] = UseLocalStateStorage("goals", [
        {
            _id: uuidv4(),
            name: "Win hackathon",
            description: "Make best task planner app ever",
            timeAdded: new Date(),
            duration: 2000,
            isActive: false,
            hashTags: {
                0: { _id: "0", tag: "health", color: "green" },
                1: { _id: "1", tag: "love", color: "red" },
            },
        },
    ]);

    

  return (
    <div>
          <CssBaseline />
          <ThemeProvider />
          <CssBaseline />
          <AppBar>
              <Toolbar>
                  <Typography variant='h6'>Done yours</Typography>
                  <div>
                      <Button type='contained' color='secondary'>Statistics</Button>
                      <IconButton
                          aria-label="toggle dark mode"
                          aria-controls="menu-appbar"
                          aria-haspopup="false"
                          color="inherit"
                      >
                          <Link
                              href="https://github.com/Juggernaut9/get-it-done"
                              target="_blank"
                              rel="noopener noreferrer"
                              color="inherit"
                          >
                              <IconButton
                                  aria-label="Github repository link"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  color="inherit"
                              >
                                  <GitHub />
                              </IconButton>
                          </Link>
                      </IconButton>
                  </div>
              </Toolbar>
          </AppBar>
          <Toolbar />
          <Container>
              <Box my={2}>
                  <NewGoalForm setGoals={setGoals} globalHashTags={globalHashTags}/>
                  <GoalList goals={goals} setGoals={setGoals} globalHashTags={globalHashTags}/>
                  
                      <Routes>
                          <Route path='/statistics'></Route>
                        </Routes>
              </Box>
          </Container>
    </div>
  );
}

export default App;
