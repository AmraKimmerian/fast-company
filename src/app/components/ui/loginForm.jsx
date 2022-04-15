import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
//import * as yup from 'yup' // npm i yup - удобный валидатор
const LoginForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)
  const { signIn } = useAuth()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await signIn(data)

      history.push(
        history.location.state?.from.pathname
          ? history.location.state.from.pathname
          : '/'
      )
    } catch (error) {
      setEnterError(error.message)
    }
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
