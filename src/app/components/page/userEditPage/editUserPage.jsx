import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'

const EditUserPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const { currentUser, updateUserData } = useAuth()
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const qs = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    }
    console.log(qs)
    await updateUserData(qs)
    history.push(`/users/${currentUser._id}`)
  }

  const transformData = (data) => {
    return getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }))
  }
  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      })
    }
  }, [professionsLoading, qualitiesLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: { message: 'Эл. почта обяз. для заполнения' },
      isEmail: { message: 'Введите корректный email' }
    },
    name: {
      isRequired: { message: 'Введите имя' }
    },

    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && professions && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Эл. почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Choose your profession"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
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
                label="Выберите ваши качества"
              />

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}
EditUserPage.propTypes = {
  userId: PropTypes.string.isRequired
}
export default EditUserPage
