import React from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

import "./Navigation.css";

function Navigation({ isMenuDisplayed, buttonClick }) {
  const location = useLocation();
  const isMain = location.pathname === "/";
  const isMovies = location.pathname === "/movies";
  const isSavedMovies = location.pathname === "/saved-movies";

  const classNameNavigationBlock = classnames("navigation-block", {
    "navigation-block_column": isMenuDisplayed,
  });
  const classNameNavigationLinkMain = classnames(
    "navigation-block__link navigation-block__link_invisible",
    { "navigation-block__link_active": isMain }
  );
  const classNameNavigationLinkMovies = classnames("navigation-block__link", {
    "navigation-block__link_active": isMovies,
  });
  const classNameNavigationLinkSavedMovies = classnames(
    "navigation-block__link",
    { "navigation-block__link_active": isSavedMovies }
  );

  return (
    <ul className={classNameNavigationBlock}>
      <li className="navigation-block__item">
        <Link
          className={classNameNavigationLinkMain}
          to="/"
          onClick={buttonClick}
        >
          Главная
        </Link>
      </li>
      <li className="navigation-block__item">
        <Link
          className={classNameNavigationLinkMovies}
          to="/movies"
          onClick={buttonClick}
        >
          Фильмы
        </Link>
      </li>
      <li className="navigation-block__item">
        <Link
          className={classNameNavigationLinkSavedMovies}
          to="/saved-movies"
          onClick={buttonClick}
        >
          Сохранённые фильмы
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
