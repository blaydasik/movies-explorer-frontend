import './Register.css'

function Register({ handleSubmitRegistration }) {
  return (
    <main className="main">
      <article className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleEditSaveButton}>
          <fieldset className="profile__fieldset">
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
              disabled={isButtonDisabled}
            >
              {textOnButton}
            </button>
          </fieldset>
        </form>
        <button className="profile__button-exit" onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </article>
    </main>
  )
}

export default Register;