import React, { useState } from "react"
import { Container, TextField, Button, Typography, Paper } from "@mui/material"
import { handleSignIn } from "../../firebase"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Login submitted:", { email, password })
    const success = await handleSignIn(email, password)
    if (success) {
      console.log("Login successful")
      navigate("/")
    } else {
      console.log("Login failed")
    }
  }

  return (
    <Container>
      <title>UpayaaX | Admin | Login</title>
      <Paper elevation={3} style={{ padding: 50 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
