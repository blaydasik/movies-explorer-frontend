import { Link, useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const nav = useNavigate();

  return (
    <article className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" onClick={() => nav(-1)}>
        Назад
      </Link>
    </article>
  );
}

export default NotFound;
