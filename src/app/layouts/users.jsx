import { useParams } from 'react-router-dom'
import User from '../component/user'
import UsersList from '../component/usersList'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return userId ? <User userId={userId} /> : <UsersList />
}

export default Users
