import "./App.css"
import { Container } from "@mui/material"
import DataTable from "./components/table"

function App() {
  // const res = use(promise)
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <DataTable />
    </Container>
  )
}

export default App
