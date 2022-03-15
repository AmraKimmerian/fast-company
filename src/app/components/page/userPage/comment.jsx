const Comment = ({ comment }) => {
  console.log(comment)
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    <span className="small m-1">{comment.userId}</span>

                    <span className="small">{comment.created_at}</span>
                  </p>
                  <button className="btn btn-sm text-primary d-flex align-items-center">
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
