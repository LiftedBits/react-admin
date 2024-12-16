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
  GridRowParams,
  GridSlotProps,
  GridToolbarContainer,
} from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useGridApiRef } from "@mui/x-data-grid"
import SplitButton from "../button-group"
import { useState } from "react"
import { Action } from "../../types"
import { MULTI_SELECT_ACTIONS, SINGLE_SELECT_ACTIONS } from "../../config"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { Button } from "@mui/material"
import { randomId } from "@mui/x-data-grid-generator"

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: "", isNew: true },
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

const paginationModel = { page: 0, pageSize: 5 }

interface DataTableProps {
  rows: any[]
  setRows: (rows: any[]) => void
  columns: GridColDef[]
  onRowClick: (params: GridRowParams) => void
}

export default function DataTable({
  rows,
  setRows,
  columns,
  onRowClick,
}: DataTableProps) {
  const [actions, setActions] = useState<Action[]>([])
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  console.log(actions)
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

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
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
      getActions: ({ id }) => {
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        // onRowClick={onRowClick}
        sx={{ border: 0 }}
      />
      {/* <SplitButton /> */}
    </Paper>
  )
}
