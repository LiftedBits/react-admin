import { Container, useTheme } from "@mui/material"
import CollectionsList from "../../components/collections-list"
import { collections } from "../../config/upayaa"

export default function Home() {
  const theme = useTheme()
  return (
    <Container
      maxWidth={false} // Removes max-width restriction
      disableGutters // Removes default padding
      sx={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: theme.palette.background.default, // Uses theme background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2), // Uses theme spacing
      }}
    >
      <title>UpayaaX | Admin | Home</title>
      <CollectionsList collections={Object.values(collections)} />
    </Container>
  )
}
