import React, { useState, useEffect } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { areObjectsEqual } from "../../functions/utils"

interface EditModalProps {
  open: boolean
  handleClose: () => void
  data: { [key: string]: any } | null // Allow data to be null initially
  onSave: (updatedData: { [key: string]: any }) => void
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData(data)
      setIsChanged(false)
    }
  }, [data])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    setIsChanged(!areObjectsEqual(newFormData, data))
  }

  const handleSubmit = () => {
    if (isChanged) {
      onSave(formData)
      handleClose()
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">Edit Entry</Typography>
        {data &&
          Object.keys(data).map((key) => (
            <TextField
              key={key}
              name={key}
              label={key}
              value={formData[key] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isChanged}
        >
          Save
        </Button>
      </Box>
    </Modal>
  )
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default EditModal
