import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Collection } from "../../config/upayaa"
import { getList } from "../../functions/apis"
import DataTable from "../../components/table"
import { CollectionPageSkeleton } from "../../components/skeleton"

const CollectionPage = ({ collection }: { collection: Collection }) => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function getAndSetData() {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const data = await getList(collection.key)
    setItems(data)
    setLoading(false)
  }
  useEffect(() => {
    console.log("useEffect")
    getAndSetData()
  }, [])

  return loading ? (
    <Container
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 0,
      }}
    >
      <CollectionPageSkeleton />
    </Container>
  ) : (
    <Box>
      <Typography variant="h4">{collection.title}</Typography>
      <Typography variant="body1">{collection.description}</Typography>
      <DataTable columns={collection.cols} rows={items} />
    </Box>
  )
}

export default CollectionPage
