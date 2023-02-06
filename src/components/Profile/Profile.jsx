import React, { useState } from "react";

import "./Profile.css";
import "../Main/Main.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useForm";

function Profile({ handleSubmitProfile, onSignOut }) {
  // подпишемся на контекст текущего пользователя
  const { currentUser, commonError } = React.useContext(CurrentUserContext);
  // переменная отвечающая за доступность input'ов для ввода
  const [isDisabled, setIsDisabled] = useState(true);
  // подключим хук для валидации формы
  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormAndValidation();
  //  изменились ли значения инпутов от исходных
  const isChanged =
    values.name !== currentUser.name || values.email !== currentUser.email;
  //  кнопка в состоянии submit
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  //  кнопка заблокирована от нажатия, если данные не валидны или не менялись
  let isButtonDisabled;
  if (isSubmitButton) {
    if (isValid && isChanged) {
      isButtonDisabled = "";
    } else {
      isButtonDisabled = "disabled";
    }
  } else {
    isButtonDisabled = "";
  }
  const textOnButton = isSubmitButton ? "Сохранить" : "Редактировать";

  // получим данные пользователя в управляемые компоненты
  React.useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  // обработчик нажатия на кнопку сохранить-редактировать
  function handleEditSaveButton(evt) {
    evt.preventDefault();
    if (isSubmitButton) {
      handleSubmitProfile(setIsSubmitButton, setIsDisabled, values);
    } else {
      setIsSubmitButton(true);
      setIsDisabled(false);
    }
  }

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
                value={values.name || ""}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Имя"
                required
              ></input>
              <span className="profile__error">{errors.name || ""}</span>
            </label>
            <label className="profile__label">
              <span className="profile__span">E-mail</span>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="email"
                value={values.email || ""}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="e-mail"
                required
              ></input>
              <span className="profile__error">{errors.email || ""}</span>
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
  );
}

export default Profile;
