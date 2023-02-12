import React from "react";

import "./SavedMovies.css";
import "../Movies/Movies.css";

import SearchForm from "../Movies/SearchForm/SearchForm.jsx";
import Preloader from "../Movies/Preloader/Preloader.jsx";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedMovies({
  isLoading,
  isFailed,
  cards,
  isShortFilms,
  setIsShortFilms,
  handleShortFilms,
  handleSearchSavedFilm,
  handleDeleteFilm,
  savedCards
}) {
    // подпишемся на контекст текущего пользователя
    const { currentUser } = React.useContext(CurrentUserContext);

  // отберем movieId карточек данного пользователя
  const movieIdList = savedCards.map((item) => (item.owner === currentUser._id) ? item.movieId : []);
  const cardsSaved = cards.filter((item) => movieIdList.indexOf(item.movieId)>=0 );
  // если в результате поиска фильмов ничего не найдено
  const isFound = cards.length === savedCards.length ? true : cardsSaved.length > 0;

  let message;
  if (isFailed) {
    message =
      "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  } else if (!isFound) {
    message = "Ничего не найдено";
  } else {
    message = "";
  }

  return (
    <main className="main">
      <SearchForm
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
        handleShortFilms={handleShortFilms}
        handleSearchSavedFilm={handleSearchSavedFilm}
      />
      <div className="movies-preloader">
        {isLoading && <Preloader />}
        {(!isFound || isFailed) && (
          <p className="movies-preloader__not-found">{message}</p>
        )}
      </div>
      <MoviesCardList
        cards={cardsSaved}
        handleDeleteFilm={handleDeleteFilm}
        savedCards={savedCards}
      />
    </main>
  );
}

export default SavedMovies;
