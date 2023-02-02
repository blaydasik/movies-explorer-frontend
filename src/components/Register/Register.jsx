import React from 'react'

import './Register.css'

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useFormAndValidation } from '../../hooks/useForm'

function Register({ handleSubmitRegistration }) {
   //подпишемся на контекст текущего пользователя
   const commonError = React.useContext(CurrentUserContext).commonError
  //подключим хук для валидации формы
  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
  } = useFormAndValidation()

  return (
    <main className="main">
      <article className="register">
        <h2 className="register__header">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmitRegistration}>
          <fieldset className="register__fieldset">
            <label className="profile__label">
              <span className="profile__span">Имя</span>
              <input
                className="profile__input"
                id="name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                value={values['name'] || ''}
                onChange={handleChange}
                placeholder="Имя"
                required
              ></input>
              <span className="profile__error">{errors['name'] || ''}</span>
            </label>
            <label className="profile__label">
              <span className="profile__span">E-mail</span>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="email"
                value={values['email'] || ''}
                onChange={handleChange}
                placeholder="e-mail"
                required
              ></input>
              <span className="profile__error">{errors['email'] || ''}</span>
            </label>
            <span className="profile__error">{commonError}</span>
            <button
              className="profile__button-submit"
              id="profile-submit"
              type="submit"
              disabled={isValid}
            >
              
            </button>
          </fieldset>
        </form>

      </article>
    </main>
  )
}

export default Register;