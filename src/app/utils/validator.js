function validate(validateMethod, data, config) {
  let notValid
  switch (validateMethod) {
    case 'isRequired':
      notValid = data.trim() === ''
      break

    case 'isEmail':
      {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        notValid = !emailRegExp.test(data)
      }
      break

    case 'hasCapitalSymbol':
      const capitalRegExp = /[A-Z]+/g
      notValid = !capitalRegExp.test(data)
      break

    case 'hasDigitSymbol':
      const digitRegExp = /\d+/g
      notValid = !digitRegExp.test(data)
      break

    case 'min':
      notValid = data.length < config.value
      break

    default:
      break
  }
  if (notValid) return config.message
}

export function validator(data, config) {
  const errors = {}
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  }
  return errors
}
