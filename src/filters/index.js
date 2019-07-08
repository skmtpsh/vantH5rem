import dayjs from 'dayjs'
export const FilterTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  let momentObj = dayjs(value)
  if (value) {
    return momentObj.format(format)
  }
  return value
}

export const FilterFormat = (value, type) => {
  let val = ''
  function formatNum (n) {
    let star = ''
    for (let i = 0; i < n; i++) {
      star += '*'
    }
    return `${value.substring(0, 4)} ${star} ${value.substring(value.length - 3)}`
  }
  if (type === 'idCard') {
    val = formatNum(7)
  } else if (type === 'mobile') {
    val = formatNum(4)
  }
  return val
}

export default {
  FilterTime,
  FilterFormat
}
