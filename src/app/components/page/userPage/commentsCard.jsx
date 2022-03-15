import Comment from './comment'

const CommentsCard = ({ comments }) => {
  return (
    <div className="card-body">
      <h2>Comments</h2>
      <hr />
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  )
}
export default CommentsCard
