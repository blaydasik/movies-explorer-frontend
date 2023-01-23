import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

  return (
    <div className='not-found'>
      <h1 className='not-found__header'>404</h1>
      <span className='not-found__span'>Страница не найдена</span>
      <Link className='not-found__link'>Назад</Link>
    </div>
  )
}

export default NotFound;
