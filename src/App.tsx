import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import { PrivateRoutes } from "./components/protected-route"
import Home from "./pages/home"

function App() {
  return (
    // <Container style={{ height: "100vh", width: "100vw" }}>
    //   {/* <DataTable /> */}
    //   {/* <Home /> */}
    //   <CollectionPage collection={collections.blogs} />
    // </Container>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          
          {/* <Route path="/products" element={<Products />} /> */}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
