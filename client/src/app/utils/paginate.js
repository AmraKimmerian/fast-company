export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  let arr = items
  if (!Array.isArray(arr)) arr = Object.values(items)
  return [...arr].splice(startIndex, pageSize)
}
