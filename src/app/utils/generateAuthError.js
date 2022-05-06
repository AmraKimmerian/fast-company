export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Email или пароль введены некорректно'
    case 'EMAIL_EXIST':
      return 'Пользователь с таким email уже существует'
    default:
      return 'Слишком много попыток входа, попробуйте позднее.'
  }
}
