export const getFormattedDate = (dateValue) => {
  const dateEndByDay = dateValue.getDate()
  const dateEndByMonth = dateValue.getMonth() + 1
  const dateEndByYear = dateValue.getFullYear()
  
  return `${dateEndByYear}-${dateEndByMonth}-${dateEndByDay}`
}
