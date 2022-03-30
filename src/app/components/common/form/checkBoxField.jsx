import PropTypes from 'prop-types'

const CheckBoxField = ({ name, value, onChange, error, children }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value })
  }
  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label is-invalid" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
CheckBoxField.propType = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default CheckBoxField
