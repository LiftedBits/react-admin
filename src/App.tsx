import "./App.css"
import { Container } from "@mui/material"
import Home from "./pages/home"
import CollectionPage from "./pages/collection-page"
import { collections } from "./config/upayaa"

function App() {
  return (
    <Container style={{ height: "100vh", width: "100vw" }}>
      {/* <DataTable /> */}
      {/* <Home /> */}
      <CollectionPage collection={collections.blogs} />
    </Container>
  )
}

export default App
