import './RegLog.css';
import { Link } from "react-router-dom";

function RegLog() {

  return (
    <ul className="reg-log">
      <li>
        <Link className="reg-log__link"
          to="/signup">
          Регистрация
        </Link>
      </li>
      <li>
        <Link className="reg-log__button"
          to="/signin">
          Войти
        </Link>
      </li>
    </ul>
  );
}

export default RegLog;