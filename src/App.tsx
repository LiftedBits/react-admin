import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import { PrivateRoutes } from "./components/protected-route"
import Home from "./pages/home"
import { collections } from "./config/upayaa"
import CollectionPage from "./pages/collection-page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />

          {Object.keys(collections).map((key) => (
            <Route
              path={`/${key}`}
              element={<CollectionPage collection={collections[key]} />}
            />
          ))}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
