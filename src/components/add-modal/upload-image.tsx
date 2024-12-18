import React, { useState } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import clsx from "clsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../firebase"
import SaveIcon from "@mui/icons-material/Save"
import DeleteIcon from "@mui/icons-material/Delete"
import { Container } from "@mui/system"
import { useSnackbar } from "../../contexts/snackbar-context"

export type FileUploadProps = {
  imageButton?: boolean
  accept: string
  hoverLabel?: string
  dropLabel?: string
  width?: string
  height?: string
  backgroundColor?: string
  image?: {
    url: string
    imageStyle?: {
      width?: string
      height?: string
    }
  }
  data: { [key: string]: any }
  setData: (newData: { [key: string]: any }) => void
  field: string
}

const useStyle = makeStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
})

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "400px",
  height = "100px",
  image: {
    url = "",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  data,
  setData,
  field,
}) => {
  const classes = useStyle()
  const { showSnackbar } = useSnackbar()
  const [imageUrl, setImageUrl] = useState<string | undefined>(url)
  const [labelText, setLabelText] = useState<string>(hoverLabel)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true)
    },
    onMouseLeave: () => {
      setIsMouseOver(false)
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(true)
      setLabelText(dropLabel)
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(false)
      setLabelText(hoverLabel)
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e)
      setLabelText(hoverLabel)
      setIsDragOver(false)
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
        setImage(e.dataTransfer.files[0])
      }
    },
  }

  const handleUpload = async () => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`)
      setIsUploading(true)
      await uploadBytes(imageRef, image)
      const url = await getDownloadURL(imageRef)
      setIsUploading(false)
      if (url) {
        setImageUrl(url)
        setData({ ...data, [field]: url })
        showSnackbar("Image uploaded to firebase successfully", "success")
      } else {
        setData({ ...data, [field]: "" })
        showSnackbar("Failed to upload image to firebase", "error")
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }
  console.log(imageUrl)

  return (
    <>
      {!imageUrl && (
        <>
          <input
            onChange={handleChange}
            accept={accept}
            className={classes.hidden}
            id="file-upload"
            type="file"
          />

          <label
            htmlFor="file-upload"
            {...dragEvents}
            className={clsx(classes.root, isDragOver && classes.onDragOver)}
          >
            <Box
              width={width}
              height={height}
              // bgcolor={backgroundColor}
              className={classes.noMouseEvent}
            >
              {imageButton && (
                <Box position="absolute" height={height} width={width}>
                  <img alt="file upload" src={imageUrl} style={imageStyle} />
                </Box>
              )}

              {(!imageButton || isDragOver || isMouseOver) && (
                <>
                  <Box
                    height={height}
                    width={width}
                    className={classes.iconText}
                  >
                    <CloudUploadIcon fontSize="large" />
                    <Typography>{labelText}</Typography>
                  </Box>
                </>
              )}
            </Box>
          </label>
        </>
      )}
      {imageUrl && (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <a href={imageUrl} target="_blank">
            <img src={imageUrl} height="100px" />
          </a>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={handleUpload} disabled={isUploading}>
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setImageUrl("")
                setImage(null)
              }}
              disabled={isUploading}
            >
              <DeleteIcon />
            </IconButton>
          </Container>
        </Container>
      )}
    </>
  )
}

export default FileUpload
