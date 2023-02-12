import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";

function SearchForm({
  isShortFilms,
  setIsShortFilms,
  handleShortFilms,
  handleSearchFilm,
  handleSearchSavedFilm,
  savedTextForSearch,
}) {
  const location = useLocation();
  const isSavedFilms = location.pathname === "/saved-movies";
  // стэйт переменные инпута и ошибки
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");

  // состояние кнопки поиска
  const [isButtonDisabled, setIsButtonDisabled] = useState(savedTextForSearch);

  function handleSliderChange() {
    setIsShortFilms((state) => !state);
    handleShortFilms();
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    // провалидируем форму
    if (searchText === undefined || searchText === "") {
      setIsButtonDisabled(true);
      setSearchError("Нужно ввести ключевое слово");
    } else if (isSavedFilms) {
      handleSearchSavedFilm(searchText);
    } else {
      handleSearchFilm(searchText);
    }
  }

  function handleSearchChange(evt) {
    setSearchError("");
    setSearchText(evt.target.value);
    setIsButtonDisabled(false);
  }

  return (
    <article className="article">
      <form className="search-form" onSubmit={handleSubmitButton} noValidate>
        <fieldset className="search-form__fieldset-film">
          <label className="search-form__label-film">
            <input
              className="search-form__input"
              id="film"
              placeholder="Фильм"
              type="text"
              name="film"
              minLength="2"
              defaultValue={savedTextForSearch || ""}
              values={searchText}
              onChange={handleSearchChange}
            />
            <span className="search-form__error">{searchError}</span>
          </label>
          <button
            className="search-form__submit-button"
            id="form-submit"
            type="submit"
            disabled={isButtonDisabled ? "disabled" : ""}
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
