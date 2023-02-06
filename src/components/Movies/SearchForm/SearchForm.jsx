import React from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";

import useFormAndValidation from "../../../hooks/useForm";

function SearchForm({
  isShortFilms,
  setIsShortFilms,
  handleShortFilms,
  handleSearchFilm,
  handleSearchSavedFilm,
  textForSearch,
}) {
  const location = useLocation();
  const isSavedFilms = location.pathname === "/saved-movies";
  // подключим хук для валидации формы
  const { values, handleChange, errors, isValid } =
    useFormAndValidation();

  const errorMessage =
    values.film === undefined || values.film === ""
      ? "Нужно ввести ключевое слово"
      : errors.film || "";

  function handleSliderChange() {
    setIsShortFilms(!isShortFilms);
    if (isSavedFilms) {
      handleSearchSavedFilm();
    } else {
      handleShortFilms();
    }
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    if (isSavedFilms) {
      handleSearchSavedFilm(values.film);
    } else {
      handleSearchFilm(values.film);
    }
  }

  return (
    <article className="article">
      <form className="search-form" onSubmit={handleSubmitButton}>
        <fieldset className="search-form__fieldset-film">
          <label className="search-form__label-film">
            <input
              className="search-form__input"
              id="film"
              placeholder="Фильм"
              type="text"
              name="film"
              minLength="2"
              maxLength="30"
              defaultValue={textForSearch || ""}
              values={values.film || ""}
              onChange={handleChange}
              required
            />
            <span className="search-form__error">{errorMessage}</span>
          </label>
          <button
            className="search-form__submit-button"
            disabled={isValid ? "" : "disabled"}
          ></button>
        </fieldset>
        <fieldset className="search-form__fieldset-slider">
          <label className="search-form__label-slider">
            <input
              className="search-form__slider"
              id="short-films"
              type="checkbox"
              name="short-films"
              checked={isShortFilms}
              onChange={handleSliderChange}
            />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </fieldset>
      </form>
    </article>
  );
}

export default SearchForm;
