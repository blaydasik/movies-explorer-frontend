import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";

function MoviesCardList({
  cards,
  handleButtonMoreClick,
  isButtonMoreDispayed,
  handleDeleteFilm,
  handleSaveFilm,
  savedCards
}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {cards.map((cardItem) => (
          <MoviesCard
            key={cardItem.movieId}
            card={cardItem}
            handleDeleteFilm={handleDeleteFilm}
            handleSaveFilm={handleSaveFilm}
            savedCards={savedCards}
          />
        ))}
      </ul>
      {isButtonMoreDispayed && (
        <button
          className="movies-card-list__button-more"
          onClick={handleButtonMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
