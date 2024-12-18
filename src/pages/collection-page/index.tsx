import { Container, Typography } from "@mui/material"
import { useEffect, useOptimistic, useState, useTransition } from "react"
import { Collection } from "../../config/upayaa"
import { createItem, getList } from "../../functions/apis"
import DataTable from "../../components/table"
import { CollectionPageSkeleton } from "../../components/skeleton"
import { GridRowParams } from "@mui/x-data-grid"
import BreadcrumbsBar from "../../components/breadcrumbs"
import Navbar from "../../components/navbar"
import AddModal from "../../components/add-modal"
import { generateRandomId, getNullObject } from "../../functions/utils"

export type OptimisticAction =
  | { type: "create"; newDoc: { [key: string]: any } }
  | { type: "update"; id: string; updatedRow: { [key: string]: any } }
  | { type: "delete"; id: string }

const CollectionPage = ({ collection }: { collection: Collection }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState(getNullObject(collection.fields))

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

  const [optimisticItems, addOptimisticUpdate] = useOptimistic(
    items,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case "create":
          return [...state, action.newDoc]
        case "update":
          return state.map((doc) =>
            doc.id === action.id ? action.updatedRow : doc
          )
        case "delete":
          return state.filter((doc) => doc.id !== action.id)
        default:
          return state
      }
    }
  )

  async function getAndSetData() {
    // await new Promise((resolve) => setTimeout(resolve, 1000000))
    const data = await getList(collection.key)
    setItems(data)
    setLoading(false)
  }
  useEffect(() => {
    getAndSetData()
  }, [])

  const getFields = (collection: Collection) => {
    return collection.fields.map((col) => {
      return col.key
    })
  }

  const addEntry = async () => {
    const id = generateRandomId(8)
    startTransition(async () => {
      addOptimisticUpdate({
        type: "create",
        newDoc: {
          id: id,
          ...data,
        },
      })
      try {
        const response = await createItem(collection.key, {
          ...data,
        })
        console.log(data)
        console.log(response)
        if (response.success) {
          setItems((items) => [...items, { id: id, ...data }])
        } else {
          throw Error
        }
      } catch (error) {
        console.log("error caught")
        console.log(`Error: ${error}`)
        addOptimisticUpdate({
          type: "delete",
          id: id,
        })
      }
    })
  }

  return loading ? (
    <CollectionPageSkeleton />
  ) : (
    <>
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
      <Container
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          placeItems: "center",
        }}
      >
        <Typography variant="h4">{collection.title}</Typography>
        <Typography variant="body1">{collection.description}</Typography>
        <DataTable
          columns={collection.cols}
          rows={items}
          optimisticRows={optimisticItems}
          setRows={setItems}
          fields={getFields(collection)}
          update={addOptimisticUpdate}
          collection={collection.key}
          openModal={() => setModalOpen(true)}
        />
      </Container>
      <AddModal
        open={modalOpen}
        handleClose={handleClose}
        fields={collection.fields}
        addEntry={addEntry}
        data={data}
        setData={setData}
      />
    </>
  )
}

export default CollectionPage
