import { Link } from "react-router-dom";

import "./Account.css";

function Account({ onSignOut }) {
  return (
    <ul className="account">
      <li>
        <Link className="account__link" to="/profile">
          Аккаунт
        </Link>
      </li>
      <li>
        <button className="account__button-exit" onClick={onSignOut} />
      </li>
    </ul>
  );
}

export default Account;
