import PropTypes from 'prop-types'
import UserCard from './userCard'
import QualitiesCard from './qualitiesCard'
import MeetingsCard from './meetingsCard'
import Comments from './comments'
import { useUsers } from '../../../hooks/useUsers'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = ({ userId }) => {
  const { getUserById } = useUsers()
  const user = getUserById(userId)
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
