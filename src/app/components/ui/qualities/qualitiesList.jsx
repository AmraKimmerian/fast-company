import Quality from './quality'
import PropTypes from 'prop-types'
const QualitiesList = ({ qualities }) => {
  return <>{qualities && qualities.map((id) => <Quality key={id} id={id} />)}</>
}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
