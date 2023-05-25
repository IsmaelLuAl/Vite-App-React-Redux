import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { Box, Container, TextField } from "@mui/material";
import { SplitList } from "./features/splitList/SplitList";

function App() {
  return (
    <Container>
      <Box className="counterBox">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </Box>
      <SplitList/>
    </Container>
  )
}

export default App
