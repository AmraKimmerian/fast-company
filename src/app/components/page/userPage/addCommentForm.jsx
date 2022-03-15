import { useEffect, useState } from 'react'
import SelectField from '../../common/form/selectField'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import TextAreaField from '../../common/form/textAreaField'

const initialData = { userId: '', content: '' }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите, от чьего имени вы хотите отправить сообщение'
      }
    },
    content: {
      isRequired: { message: 'Текст обязателен для заполнения' }
    }
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    api.users.fetchAll().then((result) => {
      setUsers(result)
    })
  }, [])

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id
    }))
  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <h2>New comment</h2>
        <div className="mb-4">
          <SelectField
            label="Choose your name"
            defaultOption="Выберите пользователя"
            options={arrayOfUsers}
            name="userId"
            onChange={handleChange}
            value={data.userId}
            error={errors.userId}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Сообщение
          </label>
          <TextAreaField
            value={data.content}
            onChange={handleChange}
            name="content"
            label="Сообщение"
            error={errors.content}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mx-auto">
          Опубликовать
        </button>
      </form>
    </div>
  )
}
export default AddCommentForm
