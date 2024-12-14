import { GridRenderCellParams } from "@mui/x-data-grid"

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
