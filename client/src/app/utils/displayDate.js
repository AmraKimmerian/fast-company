export function displayDate(data) {
  const date = new Date(parseInt(data))
  const dateNow = new Date()
  const yearDif = dateNow.getFullYear() - date.getFullYear()
  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate()
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours()
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes()
        if (minutesDif >= 30) return '30 минут назад'
        if (minutesDif >= 10) return '10 минут назад'
        if (minutesDif >= 5) return '5 минут назад'
        return '1 минуту назад'
      }
      return `${date.getHours()}:${date.getMinutes()}}`
    }
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long'
    })}}`
  }
  return date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate()
}
