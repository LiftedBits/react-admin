import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Collection } from "../../config/upayaa"
import { getList } from "../../functions/apis"
import DataTable from "../../components/table"
import { CollectionPageSkeleton } from "../../components/skeleton"
import { GridRowParams } from "@mui/x-data-grid"
import EditModal from "../../components/edit-modal"
import BreadcrumbsBar from "../../components/breadcrumbs"
import Navbar from "../../components/navbar"

const CollectionPage = ({ collection }: { collection: Collection }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  const handleRowClick = (params: GridRowParams) => {
    setSelectedItem(params.row)
    setModalOpen(true)
  }
  const handleClose = () => {
    setModalOpen(false)
  }
  const handleSave = (updatedData: { [key: string]: any }) => {
    console.log("Saved data:", updatedData)
  }

  async function getAndSetData() {
    // await new Promise((resolve) => setTimeout(resolve, 1000000))
    const data = await getList(collection.key)
    setItems(data)
    setLoading(false)
  }
  useEffect(() => {
    getAndSetData()
  }, [])

  return loading ? (
    <CollectionPageSkeleton />
  ) : (
    <Box>
      <Navbar />
      <BreadcrumbsBar
        stations={[
          { name: "Home", link: "/" },
          {
            name: collection.title,
            link: `/${collection.key}`,
            isActive: true,
          },
        ]}
      />
      <Typography variant="h4">{collection.title}</Typography>
      <Typography variant="body1">{collection.description}</Typography>
      <DataTable
        columns={collection.cols}
        rows={items}
        setRows={setItems}
        onRowClick={handleRowClick}
      />
      <EditModal
        open={modalOpen}
        handleClose={handleClose}
        data={selectedItem}
        onSave={handleSave}
      />
    </Box>
  )
}

export default CollectionPage
