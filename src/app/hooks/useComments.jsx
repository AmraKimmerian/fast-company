import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      console.log(userId)
      console.log(content)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, getComments, isLoading }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
