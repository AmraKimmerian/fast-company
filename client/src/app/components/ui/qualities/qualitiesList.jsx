import Quality from './quality'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'
import { useEffect } from 'react'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  if (isLoading) return 'Loading...'
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  // Основная загрузка qualities происходит при монтировании App,
  // а  знесь для обновления qualities, если вдруг на сервере они изменятся
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

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
