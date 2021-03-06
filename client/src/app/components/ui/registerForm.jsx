import { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    licence: false
  })

  const qualities = useSelector(getQualities())
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professions = useSelector(getProfessions())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isEmail: { message: 'Введите корректный email' },
      isRequired: { message: 'Эл. почта обяз. для заполнения' }
    },
    name: {
      isRequired: { message: 'Имя обяз. для заполнения' },
      min: {
        message: 'Имя должно содержать минимум 3 символа',
        value: 3
      }
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
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    dispatch(signUp(newData))
  }

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
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
        name="profession"
        options={professionsList}
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
        options={qualitiesList}
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
