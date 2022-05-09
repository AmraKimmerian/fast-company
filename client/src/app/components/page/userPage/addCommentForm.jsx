import { useState } from 'react'
import { validator } from '../../../utils/validator'
import TextAreaField from '../../common/form/textAreaField'

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validatorConfig = {
    content: {
      isRequired: { message: 'Текст обязателен для заполнения' }
    }
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(data)
    clearForm()
  }

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <h2>New comment</h2>
        <div className="mb-4">
          <TextAreaField
            value={data.content || ''}
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
