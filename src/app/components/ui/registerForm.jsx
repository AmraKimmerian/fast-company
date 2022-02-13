import { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })
  const [qualities, setQualities] = useState({})
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((result) => {
      setProfessions(result)
    })
    api.qualities.fetchAll().then((result) => {
      setQualities(result)
    })
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

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
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лиц соглашения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    console.log('errors', errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    console.log(data)
  }

  const isValid = Object.keys(errors).length === 0
  console.log('errors', errors)

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
      <SelectField
        label="Choose your profession"
        onChange={handleChange}
        name="professions"
        options={professions}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберитпе ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm
