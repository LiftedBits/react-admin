import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useGridApiRef } from "@mui/x-data-grid"
import SplitButton from "../button-group"
import { useState } from "react"
import { Action } from "../../types"
import { MULTI_SELECT_ACTIONS, SINGLE_SELECT_ACTIONS } from "../../config"

const paginationModel = { page: 0, pageSize: 5 }

interface DataTableProps {
  rows: any[]
  columns: GridColDef[]
}

export default function DataTable({ rows, columns }: DataTableProps) {
  const [actions, setActions] = useState<Action[]>([])
  const apiRef = useGridApiRef()
  const handleSelectionChange = () => {
    const selectedRows = apiRef.current.getSelectedRows()
    if (selectedRows.size === 1) {
      setActions(SINGLE_SELECT_ACTIONS)
    } else if (selectedRows.size > 1) {
      setActions(MULTI_SELECT_ACTIONS)
    }
  }
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        apiRef={apiRef}
        onRowSelectionModelChange={handleSelectionChange}
        sx={{ border: 0 }}
      />
      <SplitButton />
    </Paper>
  )
}
