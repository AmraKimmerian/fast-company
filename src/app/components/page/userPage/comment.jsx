import { useEffect, useState } from 'react'
import API from '../../../api'
import { displayDate } from '../../../utils/displayDate'

const Comment = ({ comment, onRemove }) => {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)
    API.users.getById(comment.userId).then((data) => {
      setUser(data)
      setIsLoading(false)
    })
  }, [])
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        {isLoading ? (
          'Loading...'
        ) : (
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
                      <span className="small m-1">{user && user.name} </span>

                      <span className="small">
                        {displayDate(comment.created_at)}
                      </span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(comment._id)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
