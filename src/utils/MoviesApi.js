import { apiSettings, validateAnswer } from "./constants.js";

class MoviesApi {
  // входные данные - адрес для запроса и объект заголовка
  constructor({ link, options, serverURL }) {
    this.link = link;
    this.options = options;
    this.serverURL = serverURL;
  }

  // публичный метод, загружающий карточки фильмов с сервера
  downloadMoviesCards() {
    return fetch(`${this.link}`, this.options).then(validateAnswer);
  }

  // метод, отбирающий необходимую информацию о карточках
  filterCardsInformation(cards) {
    return cards.map((item) => {
      const {
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN,
      } = item;
      const cardFullData = {
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN,
      };
      cardFullData.image = `${this.serverURL}${item.image.url}`;
      cardFullData.thumbnail = `${this.serverURL}${item.image.formats.thumbnail.url}`;
      cardFullData.movieId = item.id;
      return cardFullData;
    });
  }
}

// создадим экземпляр класса для работы с Api
const beatFilmsApi = new MoviesApi(apiSettings);
export default beatFilmsApi;
