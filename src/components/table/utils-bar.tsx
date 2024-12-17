import React from "react"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"

interface UtilsBarProps {
  searchText: string
  onChange: (value: string) => void
  openModal: () => void
}

const UtilsBar = ({ searchText, onChange, openModal }: UtilsBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        display: "flex",
        height: 50,
        gap: 50,
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleInputChange}
        placeholder="Type to search..."
        InputProps={{
          type: "search",
        }}
      />
      <Button onClick={openModal}>Add entry</Button>
    </div>
  )
}

export default UtilsBar
