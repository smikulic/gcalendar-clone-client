import { getNumberLength } from '../getNumberLength'

export const getFormattedDate = (dateValue) => {
  let dateEndByDay = dateValue.getDate()
  let dateEndByMonth = dateValue.getMonth() + 1
  const dateEndByYear = dateValue.getFullYear()

  if (getNumberLength(dateEndByDay) < 2) {
    dateEndByDay = '0' + dateEndByDay
  }
  if (getNumberLength(dateEndByMonth) < 2) {
    dateEndByMonth = '0' + dateEndByMonth
  }
  
  return `${dateEndByYear}-${dateEndByMonth}-${dateEndByDay}`
}
