import React, { useEffect, useState } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { Field } from "../../config/upayaa"
import FileUpload from "./upload-image"
import { deleteFileFromUrl } from "../../firebase"

interface AddModalProps {
  open: boolean
  handleClose: () => void
  fields: Field[]
  addEntry: () => void
  data: { [key: string]: any }
  setData: (newData: { [key: string]: any }) => void
}

const AddModal: React.FC<AddModalProps> = ({
  open,
  handleClose,
  fields,
  addEntry,
  data,
  setData,
}) => {
  const [isValid, setIsValid] = useState(true)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newData = { ...data, [name]: value }
    setData(newData)
  }

  const checkValidity = (data: { [key: string]: any }) => {
    let validity = true
    fields.forEach((field) => {
      if (!data[field.key]) {
        validity = false
      }
    })
    return validity
  }

  const handleSubmit = async () => {
    await addEntry()
    handleClose()
  }

  useEffect(() => {
    setIsValid(checkValidity(data))
  }, [data])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">Add Entry</Typography>
        {fields.map((field) =>
          field.type === "string" ? (
            <TextField
              key={field.key}
              name={field.key}
              label={field.key}
              value={data[field.key]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ) : (
            <FileUpload
              key={field.key}
              accept="image/*"
              uploadSuccess={uploadSuccess}
              setUploadSuccess={setUploadSuccess}
              data={data}
              setData={setData}
              field={field.key}
            />
          )
        )}
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
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

export default AddModal
