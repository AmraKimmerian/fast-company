import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/qualitiy.service'

const QualityContext = React.createContext()
export const useQualities = () => {
  return useContext(QualityContext)
}

const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getQualities()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  async function getQualities() {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function getQuality(id) {
    return qualities.find((q) => q._id === id)
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }
  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualityContext.Provider>
  )
}
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default QualitiesProvider
