import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import PropTypes from 'prop-types'
import UserCard from './userCard'
import QualitiesCard from './qualitiesCard'
import MeetingsCard from './meetingsCard'
import Comments from './comments'

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
  const handleEdit = () => {
    history.push(history.location.pathname + '/edit')
  }

  return user ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card mb-3">
            <UserCard
              name={user.name}
              profession={user.profession?.name || '???'}
              rate={user.rate}
              handleEdit={handleEdit}
            />
          </div>
          <div className="card mb-3">
            <QualitiesCard qualities={user.qualities} />
          </div>
          <div className="card mb-3">
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
        </div>
        <div className="col-md-8">
          <Comments userId={userId} />
        </div>
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
