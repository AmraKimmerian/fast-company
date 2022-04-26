import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const { currentUser } = useAuth()
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }
  console.log(isOpen)
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          className="img-responsive rounded-circle"
          height={40}
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  )
}
export default NavProfile
