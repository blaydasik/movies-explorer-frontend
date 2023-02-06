import "./Movies.css";

import SearchForm from "./SearchForm/SearchForm.jsx";
import Preloader from "./Preloader/Preloader.jsx";
import MoviesCardList from "./MoviesCardList/MoviesCardList.jsx";

function Movies({
  isLoading,
  isFound,
  isFailed,
  cards,
  isButtonMoreDispayed,
  handleButtonMoreClick,
  isShortFilms,
  setIsShortFilms,
  handleShortFilms,
  handleDeleteFilm,
  handleSaveFilm,
  handleSearchFilm,
  textForSearch,
  savedCards
}) {
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
        handleSearchFilm={handleSearchFilm}
        textForSearch={textForSearch}
      />
      <div className="movies-preloader">
        {isLoading && <Preloader />}
        {(!isFound || isFailed) && (
          <p className="movies-preloader__not-found">{message}</p>
        )}
      </div>
      {isFound && !isFailed && (
        <MoviesCardList
          cards={cards}
          handleButtonMoreClick={handleButtonMoreClick}
          isButtonMoreDispayed={isButtonMoreDispayed}
          handleDeleteFilm={handleDeleteFilm}
          handleSaveFilm={handleSaveFilm}
          savedCards={savedCards}
        />
      )}
    </main>
  );
}

export default Movies;
