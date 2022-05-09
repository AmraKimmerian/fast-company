import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill" />
      } else {
        return <i className="bi bi-caret-up-fill" />
      }
    }
    return null
  }

  return (
    <thead>
      <tr>
        {Object.entries(columns).map(([key, column]) => (
          <th
            key={key}
            scope="col"
            onClick={
              column.path
                ? () => {
                    handleSort(column.path)
                  }
                : undefined
            }
            {...{ role: column.path && 'button' }}
          >
            {column.name} {renderSortArrow(selectedSort, column.path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
