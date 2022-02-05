import PropTypes from 'prop-types'

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    return columns[column].component || _.get(item, columns[column].path)
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((key) => (
            <td key={key}>{renderContent(item, key)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
}
export default TableBody
