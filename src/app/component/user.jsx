import Quality from './quality'
import Bookmark from './bookmark'

const User = (props) => {
  return (
    <tr>
      <th scope="row">{props.name}</th>
      <td>
        {props.qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}/5</td>
      <td>
        <Bookmark
          status={props.bookmark}
          onClick={() => props.onToggleBookmark(props._id)}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.onDeleteUser(props._id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
