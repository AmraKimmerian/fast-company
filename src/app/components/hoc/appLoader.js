import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadQualitiesList } from '../../store/qualities'
import { loadProfessionsList } from '../../store/professions'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../store/users'

// Или AuthLoader
const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [])
  if (usersStatusLoading) return 'Loading'
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default AppLoader
