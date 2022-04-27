import AddCommentForm from './addCommentForm'
import CommentsCard from './commentsCard'
import { orderBy } from 'lodash'
import { useComments } from '../../../hooks/useComments'

const Comments = () => {
  const { createComment, comments, removeComment } = useComments()

  const handleSubmit = (data) => {
    createComment(data)
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments({ ...comments, data }))
  }

  const handleRemoveComment = (id) => {
    removeComment(id)
    // api.comments
    //   .remove(id)
    //   .then((id) => setComments(comments.filter((x) => x._id !== id)))
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
