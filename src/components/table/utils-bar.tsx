import React from "react"
import { IconButton } from "@mui/material"
import Add from "@mui/icons-material/Add"
import { Search, SearchIconWrapper, StyledInputBase } from "../navbar"
import SearchIcon from "@mui/icons-material/Search"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Container } from "@mui/system"

interface UtilsBarProps {
  searchText: string
  onChange: (value: string) => void
  openModal: () => void
  refresh: () => void
}

const UtilsBar = ({
  searchText,
  onChange,
  openModal,
  refresh,
}: UtilsBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div
      style={{
        padding: "20px",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={handleInputChange}
        />
      </Search>
      <Container style={{ textAlign: "right" }}>
        <IconButton onClick={openModal}>
          <Add />
        </IconButton>
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
      </Container>
    </div>
  )
}

export default UtilsBar
