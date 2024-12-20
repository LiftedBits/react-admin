import { Container, Typography } from "@mui/material"
import { useEffect, useOptimistic, useState, useTransition } from "react"
import { Collection } from "../../config/upayaa"
import { createItem, getList } from "../../functions/apis"
import DataTable from "../../components/table"
import { CollectionPageSkeleton } from "../../components/skeleton"
import Navbar from "../../components/navbar"
import AddModal from "../../components/add-modal"
import { generateRandomId, getNullObject } from "../../functions/utils"
import { useSnackbar } from "../../contexts/snackbar-context"
import { deleteFileFromUrl } from "../../firebase"

export type OptimisticAction =
  | { type: "create"; newDoc: { [key: string]: any } }
  | { type: "update"; id: string; updatedRow: { [key: string]: any } }
  | { type: "delete"; id: string }

const CollectionPage = ({ collection }: { collection: Collection }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<{ [key: string]: any }>(
    getNullObject(collection.fields)
  )

  console.log(isPending)

  const { showSnackbar } = useSnackbar()

  const handleClose = () => {
    setModalOpen(false)
    setData(getNullObject(collection.fields))
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

  const refreshData = async () => {
    setLoading(true)
    await getAndSetData()
  }

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
        if (response.success) {
          setItems((items) => [...items, { id: id, ...data }])
          showSnackbar("Entry added successfully", "success")
        } else {
          throw Error
        }
      } catch (error) {
        const fileFields = collection.fields.filter(
          (field) => field.type === "image"
        )
        fileFields.forEach((field) => {
          if (data[field.key]) {
            deleteFileFromUrl(data[field.key])
          }
        })
        console.log(`Error: ${error}`)
        showSnackbar("Error adding entry. Refresh and try again!", "error")
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
      <Navbar
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
          marginTop: "10px",
        }}
      >
        <Typography variant="h4">{collection.title}</Typography>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          {collection.description}
        </Typography>
        <DataTable
          columns={collection.cols}
          rows={items}
          optimisticRows={optimisticItems}
          setRows={setItems}
          fields={getFields(collection)}
          update={addOptimisticUpdate}
          collection={collection.key}
          refresh={refreshData}
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
