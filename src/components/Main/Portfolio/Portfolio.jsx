import "./Portfolio.css";

function Portfolio() {
  return (
    <article className="article portfolio" id="portfolio">
      <div className="article__container portfolio__container">
        <h2 className="portfolio__header">Портфолио</h2>
        <ul className="portfolio__nav-list">
          <li>
            <a
              className="portfolio__nav-item"
              target="_blank"
              rel="noreferrer"
              href="https://blaydasik.github.io/how-to-learn/"
            >
              <h3 className="portfolio__link">Статичный сайт</h3>
              <span className="portfolio__link-logo">↗</span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__nav-item"
              target="_blank"
              rel="noreferrer"
              href="https://blaydasik.github.io/russian-travel/"
            >
              <h3 className="portfolio__link">Адаптивный сайт</h3>
              <span className="portfolio__link-logo">↗</span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__nav-item portfolio__nav-item_without-underline"
              target="_blank"
              rel="noreferrer"
              href="https://blaydasik.github.io/react-mesto-auth/"
            >
              <h3 className="portfolio__link">Одностраничное приложение</h3>
              <span className="portfolio__link-logo">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default Portfolio;
