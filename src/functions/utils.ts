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
