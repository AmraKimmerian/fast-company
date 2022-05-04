import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useDispatch } from 'react-redux'
import { login } from '../../store/users'
//import * as yup from 'yup' // npm i yup - удобный валидатор
const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    setEnterError(null)
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Эл. почта обяз. для заполнения' }
    },
    password: {
      isRequired: { message: 'Пароль обяз. для заполнения' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const redirect = history.location.state?.from.pathname
    ? history.location.state.from.pathname
    : '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    dispatch(login({ payload: data, redirect }))
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Эл. почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {enterError && <p className="text-danger">{enterError}</p>}
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
