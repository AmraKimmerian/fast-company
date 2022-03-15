import NewCommentCard from './newCommentCard'
import CommentsCard from './commentsCard'
import { useCallback, useEffect, useState } from 'react'
import api from '../../../api'

const Comments = ({ userId }) => {
  console.log('RERENDER')
  const [comments, setComments] = useState()
  const [users, setUsers] = useState()
  const [toggleState, setToggleState] = useState(false)

  useEffect(() => {
    console.log('useEffect')
    api.comments.fetchCommentsForUser(userId).then((result) => {
      console.log('result', result)
      setComments(result)
    })
    api.users.fetchAll().then((result) => {
      setUsers(result)
    })
  }, [toggleState])

  const handleNewComment = useCallback((_id, content) => {
    const data = { pageId: userId, userId: _id, content: content }
    api.comments.add(data)
    console.log('handleNewComment')
    setToggleState(!toggleState)
  }, [])

  return (
    <>
      <div className="card mb-2">
        <NewCommentCard handleNewComment={handleNewComment} users={users} />
      </div>
      <div className="card mb-3">
        <CommentsCard comments={comments} />
      </div>
    </>
  )
}
export default Comments
