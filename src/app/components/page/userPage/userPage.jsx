import PropTypes from 'prop-types'
import UserCard from './userCard'
import QualitiesCard from './qualitiesCard'
import MeetingsCard from './meetingsCard'
import Comments from './comments'
import { CommentsProvider } from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId))
  return user ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card mb-3">
            <UserCard user={user} />
          </div>
          <div className="card mb-3">
            <QualitiesCard qualities={user.qualities} />
          </div>
          <div className="card mb-3">
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
        </div>

        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
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
