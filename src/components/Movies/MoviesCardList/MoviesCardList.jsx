import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ cards, handleButtonMoreClick, isButtonMoreDispayed, handleDeleteFilm, handleSaveFilm }) {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {cards.map((cardItem) => (
          <MoviesCard
            key={cardItem.id}
            card={cardItem}
            handleDeleteFilm={handleDeleteFilm}
            handleSaveFilm={handleSaveFilm}
          />
        ))}
      </ul>
      {isButtonMoreDispayed && (<button
        className="movies-card-list__button-more"
        onClick={handleButtonMoreClick}
      >
        Ещё
      </button>)}
    </section>
  )
}

export default MoviesCardList
