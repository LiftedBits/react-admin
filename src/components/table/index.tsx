import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useGridApiRef } from "@mui/x-data-grid"
import { startTransition, useState } from "react"
import { Action } from "../../types"
import { MULTI_SELECT_ACTIONS, SINGLE_SELECT_ACTIONS } from "../../config"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { getObjectFromRow } from "../../functions/utils"
import { OptimisticAction } from "../../pages/collection-page"
import UtilsBar from "./utils-bar"
import { deleteItem, updateItem } from "../../functions/apis"
import { useSnackbar } from "../../contexts/snackbar-context"

const paginationModel = { page: 0, pageSize: 5 }

interface DataTableProps {
  rows: any[]
  optimisticRows: any[]
  setRows: (rows: any[]) => void
  columns: GridColDef[]
  fields: string[]
  update: (action: OptimisticAction) => void
  collection: string
  openModal: () => void
  refresh: () => void
}

export default function DataTable({
  rows,
  optimisticRows,
  setRows,
  columns,
  fields,
  update,
  collection,
  openModal,
  refresh,
}: DataTableProps) {
  const [actions, setActions] = useState<Action[]>([])
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  // console.log(actions)
  const { showSnackbar } = useSnackbar()
  const apiRef = useGridApiRef()
  const handleSelectionChange = () => {
    const selectedRows = apiRef.current.getSelectedRows()
    if (selectedRows.size === 1) {
      setActions(SINGLE_SELECT_ACTIONS)
    } else if (selectedRows.size > 1) {
      setActions(MULTI_SELECT_ACTIONS)
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId, row: GridRowModel) => async () => {
    // setRows(rows.filter((row) => row.id !== id))
    startTransition(async () => {
      update({ type: "delete", id: id as string })
      try {
        const response = await deleteItem(collection, id as string)
        if (response.success) {
          setRows(rows.filter((row) => row.id !== id))
          showSnackbar("Item deleted successfully", "success")
        } else {
          throw Error
        }
      } catch (error) {
        showSnackbar("Error deleting item. Refresh and try again", "error")
        update({ type: "create", newDoc: row })
      }
    })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    const payload = getObjectFromRow(fields, newRow)
    startTransition(async () => {
      update({ type: "update", id: newRow.id, updatedRow: newRow })
      try {
        const response = await updateItem(collection, newRow.id, payload)
        if (response.success) {
          setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)))
          showSnackbar("Item updated successfully", "success")
        } else {
          throw Error
        }
      } catch (error) {
        showSnackbar("Error updating item. Refresh and try again", "error")
        update({ type: "update", id: newRow.id, updatedRow: oldRow })
      }
    })
    return newRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  columns = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, row)}
            color="inherit"
          />,
        ]
      },
    },
  ]
  return (
    <Paper sx={{ height: 400, width: "100%", maxWidth: 1000 }}>
      <UtilsBar
        searchText=""
        onChange={() => {}}
        openModal={openModal}
        refresh={refresh}
      />
      <DataGrid
        rows={optimisticRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        apiRef={apiRef}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={handleSelectionChange}
        // slots={{ toolbar: EditToolbar }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel },
        // }}
        sx={{ border: 0 }}
      />
    </Paper>
  )
}
