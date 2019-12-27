export const isCurrentDateActive = (currentDate) => {
  const actualDate = new Date()
  return currentDate.getDate() === actualDate.getDate()
}
