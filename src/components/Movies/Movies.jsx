import './Movies.css'

import SearchForm from './SearchForm/SearchForm'
import Preloader from './Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList'

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
  handleSaveFilm
}) {
  const message = isFailed
    ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    : !isFound
    ? 'Ничего не найдено'
    : ''
  return (
    <main className="main">
      <SearchForm
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
        handleShortFilms={handleShortFilms}
      />
      <div className="movies-preloader">
        {isLoading && <Preloader />}
        {(!isFound || isFailed) && (
          <p className="movies-preloader__not-found">{message}</p>
        )}
      </div>
      <MoviesCardList
        cards={cards}
        handleButtonMoreClick={handleButtonMoreClick}
        isButtonMoreDispayed={isButtonMoreDispayed}
        handleDeleteFilm={handleDeleteFilm}
        handleSaveFilm={handleSaveFilm}
      />
    </main>
  )
}

export default Movies
