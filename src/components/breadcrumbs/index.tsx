import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import { Box } from "@mui/material"

export interface Station {
  name: string
  link: string
  isActive?: boolean
}

interface BreadcrumbsBarProps {
  stations: Station[]
}

const BreadcrumbsBar = ({ stations }: BreadcrumbsBarProps) => {
  return (
    <Box sx={{ padding: 2, marginTop: 0 }}>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          color: "#E1E1E1",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {stations.map((station) => (
          <Link
            href={station.link}
            style={{
              textDecoration: "none",
              pointerEvents: station.isActive ? "none" : "auto",
            }}
            key={station.name}
            color={station.isActive ? "inherit" : "primary"}
          >
            {station.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadcrumbsBar
