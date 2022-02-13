import PropTypes from 'prop-types'
import TextField from './textField'
const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  name,
  error
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const optionArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionArray &&
          optionArray.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
SelectField.propType = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  option: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string
}
export default SelectField
