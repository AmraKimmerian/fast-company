import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import QualitiesList from './qualitiesList'
import PropTypes from 'prop-types'

const User = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((result) => {
      console.log(result)
      setUser(result)
    })
  }, [])

  const history = useHistory()
  const handleReturnToUsers = () => {
    history.push('/users')
  }

  return user ? (
    <div className="card m-1" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <h6 className="card-subtitle">{`Профессия: ${user.profession.name}`}</h6>
        <QualitiesList qualities={user.qualities} />
        <p className="xcard-tet">{`Встреч: ${user.completedMeetings}`}</p>
        <h6 className="card-subtitle">{`Рейтинг: ${user.rate}`}</h6>
        <button className="btn btn-primary mt-2" onClick={handleReturnToUsers}>
          Все пользователи
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  )
}
User.propTypes = {
  userId: PropTypes.string.isRequired
}
export default User
