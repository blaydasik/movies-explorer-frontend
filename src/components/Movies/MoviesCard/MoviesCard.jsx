import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import "./MoviesCard.css";

import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { getTimeFromMins } from "../../../utils/constants";

function MoviesCard({ card, handleDeleteFilm, handleSaveFilm, savedCards }) {
  // подпишемся на контекст текущего пользователя
  const { currentUser, loggedIn } = React.useContext(CurrentUserContext);

  // определим роут
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  // определим сохранен ли фильм текущим пользователем
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      setIsSaved(false);
      savedCards.forEach((item) => {
        if (item.owner === currentUser._id && item.movieId === card.movieId) {
          setIsSaved(true);
        }
      });
    }
  }, [savedCards, loggedIn]);

  const classNameButtonSave = classnames({
    "movies-card__button-save-clicked": isSaved,
    "movies-card__button-save": !isSaved && !isSavedMovies,
    "movies-card__button-save-none": isSavedMovies && !isSaved,
    "movies-card__button-save-clicked_delete": isSavedMovies && isSaved,
  });

  const Buttontext = isSaved && !isSavedMovies ? "" : "Сохранить";

  function handleProceedCard() {
    if (!isSaved) {
      handleSaveFilm(card);
    } else {
      handleDeleteFilm(card);
    }
  }

  return (
    <li className="movies-card">
      <button className={classNameButtonSave} onClick={handleProceedCard}>
        {Buttontext}
      </button>
      <a
        className="movies-card__link"
        target="_blank"
        rel="noreferrer"
        href={card.trailerLink}
      >
        <img
          className="movies-card__image"
          alt={card.imageName}
          src={card.image}
        />
      </a>
      <div className="movies-card__container">
        <h2 className="movies-card__title">{card.nameRU}</h2>
        <div className="movies-card__duration-container">
          <p className="movies-card__duration">
            {getTimeFromMins(card.duration)}
          </p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
