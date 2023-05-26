import logo from "./logo.svg"
import "./App.css"
import { Box, Container } from "@mui/material";
import { SplitList } from "./features/splitList/SplitList";
import { Counter } from "./features/counter/Counter"

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
