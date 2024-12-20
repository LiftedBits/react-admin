import { Container, Skeleton } from "@mui/material"

const CollectionPageSkeleton = () => {
  return (
    <Container style={{ height: "100vh", width: "100vw", paddingTop: 20 }}>
      <title>UpayaaX | Admin | Loading...</title>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          height: 50,
          marginBottom: 20,
          gap: "10%",
        }}
      >
        <Skeleton variant="rounded" style={{ flex: 0.125, height: "100%" }} />
        <Skeleton variant="rounded" style={{ flex: 0.8, height: "100%" }} />
        <Skeleton variant="rounded" style={{ flex: 0.075, height: "100%" }} />
      </Container>
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
    </Container>
  )
}

export { CollectionPageSkeleton }
