import { GridRenderCellParams } from "@mui/x-data-grid"

export const renderLink = (params: GridRenderCellParams) => (
  <a
    href={params.value}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none", color: "primary" }}
  >
    {params.value}
  </a>
)

export const renderImage = (params: GridRenderCellParams) => (
  <a
    href={params.value}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none", color: "primary" }}
  >
    <img
      src={params.value}
      alt="thumbnail"
      style={{ width: 100, height: 100, borderRadius: 5 }}
    />
  </a>
)
