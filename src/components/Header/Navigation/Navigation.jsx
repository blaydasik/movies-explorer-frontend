import './Navigation.css';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

function Navigation({ isMenuDisplayed, buttonClick }) {

  const classNameNavigationBlock = classnames('navigation-block', {'navigation-block_column' : isMenuDisplayed});

  return (
    <ul className={classNameNavigationBlock}>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link navigation-block__link_invisible' to="/" onClick={buttonClick}>
          Главная
        </Link>
      </li>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link' to="/movies" onClick={buttonClick}>
          Фильмы
        </Link>
      </li>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link' to="/saved-movies" onClick={buttonClick}>
          Сохранённые фильмы
        </Link>
      </li>
    </ul>
  )
}

export default Navigation;
