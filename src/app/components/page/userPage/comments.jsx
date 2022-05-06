import AddCommentForm from './addCommentForm'
import CommentsCard from './commentsCard'
import { orderBy } from 'lodash'
import { useComments } from '../../../hooks/useComments'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../../store/comments'
import { useParams } from 'react-router-dom'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const { createComment, removeComment } = useComments()
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    createComment(data)
  }

  const handleRemoveComment = (id) => {
    removeComment(id)
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <AddCommentForm onSubmit={handleSubmit} />
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          {!isLoading ? (
            <CommentsCard
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          ) : (
            'Loading...'
          )}
        </div>
      )}
    </>
  )
}
export default Comments
