import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import './Footer.css';

function Footer() {
  const location = useLocation();
  //определим, находимся ли мы на странице регистрации, входа или профиля
  const isSignInSignUpProfile =
    location.pathname === '/signin' ||
    location.pathname === '/signup' ||
    location.pathname === '/profile' ||
    location.pathname === '/not-found';

  const classNameFooter = classnames('footer', {
    footer_inactive: isSignInSignUpProfile,
  });

  return (
    <article className={classNameFooter}>
      <h2 className="footer__text">
        Мы строили, строили и наконец построили! Ура!
      </h2>
      <div className="footer__container">
        <p className="footer__text footer__text_copyright">
          &copy; {new Date().getFullYear()} Алексей Куров
        </p>
        <ul className="footer__link-container">
          <li>
            <a className="footer__text footer__text_link" 
              target="_blank"
              rel="noreferrer"
              href="https://practicum.yandex.ru">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a className="footer__text footer__text_link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/blaydasik">
              Github
            </a>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default Footer
