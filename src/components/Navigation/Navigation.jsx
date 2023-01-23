import './Navigation.css';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

function Navigation(isMenuDisplayed) {

  const classNameNavigationBlock = classnames('navigation-block', {'navigation-block_column' : isMenuDisplayed});

  return (
    <ul className={classNameNavigationBlock}>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link navigation-block__link_invisible' to="/">
          Главная
        </Link>
      </li>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link' to="/movies">
          Фильмы
        </Link>
      </li>
      <li className='navigation-block__item'>
        <Link className='navigation-block__link' to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </li>
    </ul>
  )
}

export default Navigation;
