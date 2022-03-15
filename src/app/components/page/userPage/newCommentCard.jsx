import { useState } from 'react'
import SelectField from '../../common/form/selectField'
import { validator } from '../../../utils/validator'

const NewCommentCard = ({ handleNewComment, users }) => {
  const [user, setUser] = useState()
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const user = users?.find((user) => user._id === e.value)
    setUser(user)
  }
  const validatorConfig = {
    content: {
      isRequired: { message: 'Текст обязателен для заполнения' }
    }
  }
  const validate = () => {
    const errors = validator({ content: content }, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user || !validate()) return
    handleNewComment(user._id, content)
    setContent('')
  }

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <h2>New comment</h2>
        <div className="mb-4">
          <SelectField
            label="Choose your name"
            defaultOption="Choose..."
            options={users}
            name={user?.name}
            onChange={handleChange}
            value={user?._id}
            error={undefined}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Сообщение
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          //disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Отправить
        </button>
      </form>
    </div>
  )
}
export default NewCommentCard
