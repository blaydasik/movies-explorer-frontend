import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Form.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useForm";
import { formTextRegister, formTextLogin, nameRegex, emailRegex } from "../../utils/constants";

function Form({ handleSubmit }) {
  // подпишемся на контекст текущего пользователя
  const { commonError } = React.useContext(CurrentUserContext);
  // подключим хук для валидации формы
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const location = useLocation();
  // определим, находимся ли мы на странице регистрации или входа
  const isSignUp = location.pathname === "/signup";
  const options = isSignUp ? formTextRegister : formTextLogin;

  function handleButtonClick(evt) {
    evt.preventDefault();
    // блокировка от повторной отправки
    setIsValid(false);
    handleSubmit(values);
  }

  return (
    <article className="form">
      <h2 className="form__header">{options.header}</h2>
      <form className="form__form" onSubmit={handleButtonClick}>
        <fieldset className="form__fieldset">
          {isSignUp && (
            <label className="form__label">
              <span className="form__span">Имя</span>
              <input
                className="form__input"
                id="name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                value={values.name || ""}
                onChange={handleChange}
                placeholder="как звать"
                required
                pattern={nameRegex}
              ></input>
              <span className="form__error">{errors.name || ""}</span>
            </label>
          )}
          <label className="form__label">
            <span className="form__span">E-mail</span>
            <input
              className="form__input"
              id="email"
              name="email"
              type="email"
              value={values.email || ""}
              onChange={handleChange}
              placeholder="куда письма слать"
              required
              pattern={emailRegex}
            ></input>
            <span className="form__error">{errors.email || ""}</span>
          </label>
          <label className="form__label">
            <span className="form__span">Пароль</span>
            <input
              className="form__input"
              id="password"
              name="password"
              type="password"
              minLength="6"
              maxLength="15"
              value={values.password || ""}
              onChange={handleChange}
              placeholder="как проверить"
              required
            ></input>
            <span className="form__error">{errors.password || ""}</span>
          </label>
          <span className="form__error">{commonError}</span>
          <button
            className="form__button-submit"
            id="form-submit"
            type="submit"
            disabled={isValid ? "" : "disabled"}
          >
            {options.button}
          </button>
        </fieldset>
      </form>
      <nav className="form__link-container">
        <p className="form__link-span">{options.span}</p>
        <Link className="form__link" to={options.linkTo}>
          {options.link}
        </Link>
      </nav>
    </article>
  );
}

export default Form;
