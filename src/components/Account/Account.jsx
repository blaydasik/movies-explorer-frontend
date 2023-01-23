import './Account.css';
import '../Navigation/Navigation.css';
import { Link } from 'react-router-dom';

function Account() {

  return (
    <ul className="account">
      <li>
        <Link className='account__link' 
          to="/profile">
          Аккаунт
        </Link>
      </li>
      <li>
        <Link className='account__button-exit' to="/">
          <div className="account__logo"></div>
        </Link>
      </li>
    </ul>
  );
}

export default Account;