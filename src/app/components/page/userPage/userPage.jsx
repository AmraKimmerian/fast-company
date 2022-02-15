import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import PropTypes from 'prop-types'

const UserPage = ({ userId }) => {
  const params = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((result) => {
      setUser(result)
    })
  }, [])

  const history = useHistory()
  // const handleReturnToUsers = () => {
  //   history.push('/users')
  // }
  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }

  return user ? (
    <div className="card m-1" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <h6 className="card-subtitle">{`Профессия: ${
          user.profession?.name || '??'
        }`}</h6>
        <Qualities qualities={user.qualities} />
        <p className="xcard-tet">{`Встреч: ${user.completedMeetings}`}</p>
        <h6 className="card-subtitle">{`Рейтинг: ${user.rate}`}</h6>
        <button className="btn btn-primary mt-2" onClick={handleClick}>
          Изменить
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  )
}
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}
export default UserPage
