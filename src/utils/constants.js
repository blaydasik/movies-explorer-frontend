export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60)
  let minutes = mins % 60
  return hours + 'ч ' + minutes + 'м'
}

export const formTextRegister = {
  header: 'Добро пожаловать!',
  button: 'Зарегистрироваться',
  span: 'Уже зарегистрированы?',
  link : 'Войти',
  linkTo : '/signin',
}

export const formTextLogin = {
  header: 'Рады видеть!',
  button: 'Войти',
  span: 'Еще не зарегистрированы?',
  link : 'Регистрация',
  linkTo : '/signup',
}
