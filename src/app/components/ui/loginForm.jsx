import { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
//import * as yup from 'yup' // npm i yup - удобный валидатор
const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required('Пароль обяз. для заполнения')
  //     .matches(
  //       /(?=.*[A-Z])/,
  //       'Пароль должен содержать хотя бы одну заглавную букву'
  //     )
  //     .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       'Пароль должен содержать один из спец. символов !@#$%^&*'
  //     )
  //     .matches(/(?=.{8,})/, 'Пароль должен содержать минимум 8 символов'),
  //   email: yup
  //     .string()
  //     .required('Эл. почта обяз. для заполнения')
  //     .email('Введите корректный email')
  // })

  const validatorConfig = {
    email: {
      isEmail: { message: 'Введите корректный email' },
      isRequired: { message: 'Эл. почта обяз. для заполнения' }
    },
    password: {
      min: {
        message: 'Пароль должен содержать минимум 8 символов',
        value: 8
      },
      hasDigitSymbol: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      hasCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isRequired: { message: 'Пароль обяз. для заполнения' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }))
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
