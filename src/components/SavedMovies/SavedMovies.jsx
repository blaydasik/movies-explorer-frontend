import './SavedMovies.css'

import SearchForm from '../Movies/SearchForm/SearchForm'
import Preloader from '../Movies/Preloader/Preloader'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'

function SavedMovies({
  isLoading,
  isFound,
  isFailed,
  cards,
  isShortFilms,
  setIsShortFilms,
  handleShortFilms,
  handleDeleteFilm,
  handleSaveFilm
}) {

  const cardsSaved = cards.filter( (item) => {
    return item.owner.length > 0;
  })

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
        cards={cardsSaved}
        handleDeleteFilm={handleDeleteFilm}
        handleSaveFilm={handleSaveFilm}
      />
    </main>
  )
}

export default SavedMovies
