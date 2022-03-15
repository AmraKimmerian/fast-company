import AddCommentForm from './addCommentForm'
import CommentsCard from './commentsCard'
import { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'

const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState()
  // const [users, setUsers] = useState()
  // const [toggleState, setToggleState] = useState(false)

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((result) => {
      setComments(result)
    })
  }, [])

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments({ ...comments, data }))
  }

  const handleRemoveComment = (id) => {
    api.comments
      .remove(id)
      .then((id) => setComments(comments.filter((x) => x._id !== id)))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <AddCommentForm onSubmit={handleSubmit} />
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <CommentsCard
            comments={sortedComments}
            onRemove={handleRemoveComment}
          />
        </div>
      )}
    </>
  )
}
export default Comments
