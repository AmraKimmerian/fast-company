import Quality from './quality'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'
const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()
  if (isLoading) return 'Loading...'
  return <>{qualities && qualities.map((id) => <Quality key={id} id={id} />)}</>
}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
