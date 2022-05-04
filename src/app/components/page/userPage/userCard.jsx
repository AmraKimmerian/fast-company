import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getProfessionById } from '../../../store/professions'

const UserCard = ({ user }) => {
  const { name, profession, rate, image, _id } = user
  console.log('p', profession)
  const prof = useSelector(getProfessionById(profession))
  const history = useHistory()
  const { currentUser } = useAuth()
  const handleEdit = () => {
    history.push(history.location.pathname + '/edit')
  }
  return (
    <div className="card-body">
      {currentUser._id === _id && (
        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
          <i className="bi bi-gear" onClick={handleEdit} />
        </button>
      )}

      <div className="d-flex flex-column align-items-center text-center position-relative">
        <img alt="avatar" src={image} className="rounded-circle" width="150" />
        <div className="mt-3">
          <h4>{name}</h4>
          <p className="text-secondary mb-1">{prof?.name || '???'}</p>
          <div className="text-muted">
            <i className="bi bi-caret-down-fill text-primary" role="button" />
            <i className="bi bi-caret-up text-secondary" role="button" />
            <span className="ms-2">{rate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserCard
