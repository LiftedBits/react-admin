import { Skeleton } from "@mui/material"

const CollectionPageSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        width="100%"
        height={60}
        style={{ marginBottom: 50 }}
      />
      <Skeleton
        variant="rectangular"
        width={"60%"}
        height={50}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant="rounded"
        width={"80%"}
        height={40}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant="rounded"
        width={"80%"}
        height={40}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant="rounded"
        width={"80%"}
        height={40}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant="rounded"
        width={"80%"}
        height={40}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant="rounded"
        width={"80%"}
        height={40}
        style={{ marginBottom: 20 }}
      />
    </>
  )
}

export { CollectionPageSkeleton }
