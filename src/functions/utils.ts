import { GridRenderCellParams, GridRowModel } from "@mui/x-data-grid"
import { Field } from "../config/upayaa"

export const convertToReadableDateTime = (isoString: string): string => {
  const date = new Date(isoString)

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })
}

export const getDateRenderProps = () => {
  return {
    valueGetter: (params: GridRenderCellParams) => {
      console.log(typeof params)
      const dateStr = String(params)
      const date = new Date(dateStr)
      return date
    },
    renderCell: (params: GridRenderCellParams<Date>) => {
      return params.value ? params.value.toLocaleString() : ""
    },
  }
}

export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const getObjectFromRow = (fields: string[], row: GridRowModel) => {
  return Object.fromEntries(fields.map((field) => [field, row[field]]))
}

export const getNullObject = (fields: Field[]) => {
  return Object.fromEntries(fields.map((field) => [field.key, null]))
}

export const generateRandomId = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }
  return result
}
