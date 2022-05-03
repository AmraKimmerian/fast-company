import Quality from './quality'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  console.log(qualities)
  const isLoading = useSelector(getQualitiesLoadingStatus())
  if (isLoading) return 'Loading...'
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  return (
    <>
      {qualitiesList &&
        qualitiesList.map((qual) => <Quality key={qual._id} {...qual} />)}
    </>
  )
}
QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
