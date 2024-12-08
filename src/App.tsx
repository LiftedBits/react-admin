import "./App.css"
import { Button, Container, Typography } from "@mui/material"

function App() {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Material-UI
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  )
}

export default App
